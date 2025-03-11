import chromadb

# Initialize ChromaDB client
client = chromadb.Client()

# Create a collection for products
product_collection = client.create_collection("products")
