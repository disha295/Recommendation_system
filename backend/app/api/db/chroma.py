from chromadb import Client
import json  # For serializing data

client = Client()

def load_sales_into_chroma(sales_data):
    collection = client.get_or_create_collection("sales")
    for record in sales_data:
        # Serialize the record into a JSON string
        document = json.dumps(record)
        collection.add(
            documents=[document],  # Now a string
            metadatas={"product_id": record["product_id"]},
            ids=[str(record["product_id"])]
        )

def get_sales_data(product_id: int):
    collection = client.get_or_create_collection("sales")
    results = collection.query(
        query_texts=[str(product_id)],
        n_results=1
    )
    return results

# Initialize ChromaDB with sales data
from backend.app.api.db.loader import sales  # Import sales data
load_sales_into_chroma(sales)
