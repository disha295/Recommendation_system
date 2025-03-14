import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import json
from pathlib import Path

BASE_DIR = Path(__file__).parent
product_file_path = BASE_DIR / "products.json"
ingredients_file_path = BASE_DIR / "ingredients.json"
sales_file_path = BASE_DIR / "sales.json"

with open(product_file_path, "r") as f:
    products = json.load(f)

with open(ingredients_file_path, "r") as f:
    ingredients = json.load(f)

with open(sales_file_path, "r") as f:
    sales_data = json.load(f)

print(f"Products loaded: {len(products)}")
print(f"Ingredients loaded: {len(ingredients)}")
print(f"Sales records loaded: {len(sales_data)}")

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
dimension = embedding_model.get_sentence_embedding_dimension()
faiss_index = faiss.IndexFlatL2(dimension)

product_metadata = []

def add_embeddings_to_faiss(products, ingredients):
    """
    Process products, resolve ingredients, and add embeddings to FAISS index.
    """
    embeddings = []
    ingredient_lookup = {ing["id"]: ing for ing in ingredients}

    for product in products:
        ingredient_names = []
        missing_ingredients = []
        for ingredient_id in product.get("ingredientIds", []):
            ingredient = ingredient_lookup.get(ingredient_id)
            if ingredient:
                ingredient_names.append(ingredient["name"])
            else:
                missing_ingredients.append(ingredient_id)

        if missing_ingredients:
            print(f"⚠️ Missing ingredients with IDs: {missing_ingredients}")

        product_text = f"{product['name']} {product['description']} {' '.join(product.get('effects', []))} {' '.join(ingredient_names)}"
        
        embedding = embedding_model.encode(product_text)
        embeddings.append(embedding)

        product_metadata.append({
            "id": product["id"],
            "name": product["name"],
            "description": product["description"],
            "image": product["image"],
            "ingredients": ingredient_names,  
            "effects": product.get("effects", []),
            "price": product.get("price", "N/A"),
            "category": product.get("category", "Unknown"),
        })

    embeddings = np.array(embeddings).astype("float32")
    faiss_index.add(embeddings)
    print(f"Added {len(embeddings)} product embeddings to FAISS.")


add_embeddings_to_faiss(products, ingredients)
print(f"FAISS index size: {faiss_index.ntotal}")
