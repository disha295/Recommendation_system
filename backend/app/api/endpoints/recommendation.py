from fastapi import APIRouter, HTTPException
from backend.app.api.db.loader import faiss_index, embedding_model, product_metadata, sales_data
import requests
import time
import json
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()

OLLAMA_API_BASE = "http://localhost:11434/v1"  # Ollama's local API endpoint

# Load the ingredients data from ingredients.json
with open("backend/app/api/db/ingredients.json", "r") as file:
    ingredients_data = json.load(file)
    
#  A dictionary for easy lookup of ingredient names by ID
ingredient_lookup = {ingredient["id"]: ingredient["name"] for ingredient in ingredients_data}

def generate_with_llama3(product_data):
    """
    Generate a product recommendation using Llama 3 via Ollama API.
    """
    # Prepare the prompt for Llama 3 with actual ingredient names
    prompt = (
        f"Write a one sentence compelling recommendation for the following product:\n"
        f"Product Name: {product_data['name']}\n"
        f"Description: {product_data['description']}\n"
        f"Key Ingredients: {product_data['ingredients']}\n"
        f"Benefits: {', '.join(product_data['effects'])}\n"
    )

    try:
        response = requests.post(
            f"{OLLAMA_API_BASE}/chat/completions",
            json={
                "model": "llama3",  
                "messages": [
                    {"role": "system", "content": "You are an AI that writes engaging product recommendations."},
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": 150,
                "temperature": 0.7
            }
        )

        response_data = response.json()
        return response_data["choices"][0]["message"]["content"].strip()

    except Exception as e:
        print(f"Error during text generation: {e}")
        return "Error generating recommendation."


def enhance_with_rag(product_data):
    """
    Enhance product recommendations using Llama 3 via Ollama.
    """
    try:
        start_time = time.time()
        print(f"Generating enhanced recommendation for {product_data['name']}...")

        # Generate using Llama 3
        enhanced_text = generate_with_llama3(product_data)

        print(f"Generated in {time.time() - start_time:.2f} seconds.")
        return enhanced_text
    except Exception as e:
        print(f"Error in RAG integration: {str(e)}")
        return "Could not generate enhanced recommendation."


def rank_recommendations_by_sales(recommendations, sales_data):
    """
    Rank recommendations based on sales data.
    """
    # A lookup dictionary for sales quantity
    sales_lookup = {sale["productId"]: sale["quantity"] for sale in sales_data}

    
    for product in recommendations:
        product["total_units_sold"] = sales_lookup.get(product["id"], 0)  
    
    return sorted(recommendations, key=lambda x: x["total_units_sold"], reverse=True)


def retrieve_similar_products(user_query: str, top_n: int = 5) -> list:
    """
    Retrieve the most similar products to the query from the FAISS index, including ingredients.
    """
    try:
        query_embedding = embedding_model.encode(user_query).astype("float32").reshape(1, -1)
        distances, indices = faiss_index.search(query_embedding, top_n)

        recommendations = []
        for idx, distance in zip(indices[0], distances[0]):
            if idx != -1:
                product = product_metadata[idx].copy()
                product["distance"] = float(distance)
                recommendations.append(product)

        return recommendations
    except Exception as e:
        print(f"Error retrieving similar products: {str(e)}")
        return []


def generate_related_keywords(query: str, product_metadata: list, model) -> list:
    """
    Generate related keywords dynamically by comparing the embedding of the user query
    with product-related metadata (e.g., effects, ingredients).
    """
    
    query_embedding = model.encode([query])[0]
    
    #  A list of all effects and ingredients in the product metadata
    all_product_data = [product["effects"] + product["ingredients"] for product in product_metadata]
        
    all_keywords = [keyword for sublist in all_product_data for keyword in sublist]
    
    keyword_embeddings = model.encode(all_keywords)
    
    similarities = cosine_similarity([query_embedding], keyword_embeddings)[0]

    top_n_indices = similarities.argsort()[-5:][::-1]  # Top 5 related keywords
    related_keywords = [all_keywords[i] for i in top_n_indices]

    return related_keywords


def simple_semantic_search(effect: str, recommendations: list, model) -> list:
    """
    Perform a semantic search, first checking category matches, 
    and if no match is found, falling back to related keyword-based search for effects.
    """
    effect_normalized = effect.strip().lower()

    category_matches = []
    for rec in recommendations:
        category = rec.get("category", "").strip().lower()
        if effect_normalized in category:
            category_matches.append(rec)

    if category_matches:
        print(f"Found {len(category_matches)} category matches for '{effect_normalized}'.")
        return category_matches

    else:
        print(f"No category matches found for '{effect_normalized}', checking effects.")
        
        # Generate related keywords from the effect
        related_keywords = generate_related_keywords(effect, recommendations, model)
        related_keywords = [kw.lower() for kw in related_keywords]  # Convert to lowercase for matching

        print(f"Related keywords for '{effect_normalized}': {related_keywords}")

        keyword_matches = [
            rec for rec in recommendations
            if any(keyword in [e.lower() for e in rec.get("effects", [])] for keyword in related_keywords)
        ]

        print(f"Found {len(keyword_matches)} keyword matches for '{effect_normalized}' using related keywords.")
        return keyword_matches


@router.get("/recommendations")
def get_recommendations(effect: str):
    """
    Retrieve product recommendations based on `effect`, enhance them with GPT, and rank them by sales.
    """
    try:
        start_time = time.time()
        print("Starting recommendation process...")

        recommendations = retrieve_similar_products(effect)
        print(f"Retrieved {len(recommendations)} recommendations.")

        filtered_recommendations = simple_semantic_search(effect, recommendations, embedding_model)
        print(f"Filtered to {len(filtered_recommendations)} recommendations matching '{effect}'.")

        if not filtered_recommendations:
            return {"recommendations": [], "message": f"No recommendations found for '{effect}'."}

        for product in filtered_recommendations:
            product_data = {
                "name": product["name"],
                "description": product["description"],
                "ingredient": product["ingredients"],  
                "effects": product.get("effects", []),
                "ingredients": product.get("ingredients", []),  
            }

            product["augmented_description"] = enhance_with_rag(product_data)
            product["image"] = product.get("image", "")

        ranked_recommendations = rank_recommendations_by_sales(filtered_recommendations, sales_data)

        print(f"Ranking completed. Total execution time: {time.time() - start_time:.2f} seconds.")

        return {"recommendations": ranked_recommendations}

    except Exception as e:
        print(f"Error during recommendation process: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
