from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings

import json
from pathlib import Path

# Define the path to your products.json file
file_path = Path(__file__).parent / "products.json"

# Load products into a variable
with open(file_path, "r") as f:
    products = json.load(f)

# Ensure `products` is properly loaded
print("Products loaded:", products)

import json
from pathlib import Path

# Load ingredients.json (adjust the path if needed)
file_path = Path(__file__).parent / "ingredients.json"
with open(file_path, "r") as f:
    ingredients = json.load(f)

# Debug: Ensure ingredients are loaded correctly
print("Ingredients loaded:", ingredients)


# Initialize ChromaDB client and collection
client = chromadb.Client(Settings())
collection = client.create_collection("product_collection")

# Initialize the embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")  # You can replace with a more advanced model

# Add product embeddings
def add_embeddings_to_db(products):
    # Debugging to count embeddings added
    count = 0
    for product in products:
        product_text = f"{product['name']} {product['description']} {' '.join(product['effects'])}"
        embedding = embedding_model.encode(product_text)
        collection.add(
            documents=[product_text],
            metadatas=[{"id": product["id"], "name": product["name"]}],
            ids=[str(product["id"])],
            embeddings=[embedding],
        )
        count += 1
    print(f"Number of embeddings added to ChromaDB: {count}")

print(f"Number of stored embeddings in collection: {collection.count()}")

