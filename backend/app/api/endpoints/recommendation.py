from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from backend.app.api.db.loader import collection, embedding_model  # Import ChromaDB and model

import logging

# Logger configuration
logger = logging.getLogger("recommendation")

router = APIRouter()

def retrieve_similar_products(query, top_n=5):
    query_embedding = embedding_model.encode(query)
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_n,
    )
    # Debugging logs
    print("Query:", query)
    print("Query embedding:", query_embedding)
    print("ChromaDB query results:", results)

    return results["metadatas"] or []

query = "relaxation"
query_embedding = embedding_model.encode(query)

# Query ChromaDB
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
)
print("Manual test results:", results)



@router.get("/recommendations")
def get_recommendations(effect: str = Query(default="relaxation", min_length=1)):
    logger.info(f"Fetching recommendations for effect: {effect}")
    
    try:
        # Perform retrieval
        results = retrieve_similar_products(effect)
        logger.info(f"Results from retrieve_similar_products: {results}")
        
        if not results:
            logger.warning(f"No recommendations found for query: {effect}")
            return {"recommendations": []}

        logger.info(f"Returning {len(results)} recommendations.")
        return {"recommendations": results}
    
    except Exception as e:
        logger.error(f"Error retrieving recommendations: {str(e)}")
        return JSONResponse(
            content={"error": "An error occurred while processing your request."},
            status_code=500,
        )

