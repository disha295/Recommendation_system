###AI-Powered Product Recommendation System with RAG

### How to Run the Prototype

1. **Backend Setup**:

   - Navigate to the `/backend` directory.
   - Create and activate a virtual environment:
     ```
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Start the FastAPI backend:
     ```
     uvicorn app.main:app --reload
     ```

2. **Frontend Setup**:

   - Navigate to the `/frontend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the React development server:
     ```
     npm start
     ```

3. **Access the Application**:

   - Open your browser and go to [http://localhost:3000](http://localhost:3000).

4. **Start Llama 3 with Ollama**:

   - To use the Llama 3 model for generating augmented recommendations, ensure the Ollama server is running locally:
   - Install the Ollama CLI:
     Visit the Ollama website and follow the instructions.
     Start the Ollama server:

     ```
     ollama serve
     ```

     Verify the server is running:
     Open your browser and navigate to:
     http://localhost:11434/v1/models
     Download the Llama 3 model:

     ```
     ollama pull llama3
     ```

     > Important: The backend will fail to generate augmented recommendations if the Ollama server is not running. Start it before launching the backend.

### Features:

- FAISS for Similarity Retrieval:
  Semantic embeddings are used to retrieve the top-N similar products for a given query.
- Retrieve-and-Generate (RAG):
  Augmented recommendations are generated by Llama 3 based on product metadata (e.g., name, description, ingredients, effects).
- Sales-Based Ranking:
  Recommendations are ranked by total_units_sold to prioritize popular products.
- Dynamic Search:
  Handles queries using semantic similarity and dynamic keyword generation for better results.
- Frontend with Loading Indicators:
  Displays loading spinners while fetching recommendations and provides a clean, user-friendly interface.

### Assumptions and Simplifications

- The product dataset is limited to a small in-memory list to simplify development.
- FAISS is used for similarity search, assuming embeddings are precomputed.
- The RAG implementation with Llama 3 (via Ollama) is used for dynamically generating augmented descriptions.
- Sales data is simulated to demonstrate ranking functionality.

### Recommendation Algorithm and RAG Implementation

1. **FAISS for Similarity Retrieval**:

   - Converts user queries into semantic embeddings using `embedding_model`.
   - FAISS retrieves the top-N most similar products using cosine similarity.
   - Results are annotated with similarity scores (`distance`).

2. **RAG (Retrieve-and-Generate)**:

   - **Retrieve**: FAISS identifies the most relevant product entries.
   - **Generate**: Llama 3 (via Ollama API) generates contextually rich product descriptions by analyzing product metadata (name, description, ingredients, effects).

3. **Sales-Based Ranking**:

   - Recommendations are ranked based on historical sales data (`total_units_sold`).
   - This ensures that the most purchased items appear higher in the results.

4. **Semantic Search**:
   - First attempts to match the query with product categories.
   - If no category match is found, it uses related keywords from effects or ingredients to refine results.

### Potential Areas for Improvement

1. **Dataset Scalability**:

   - Scale FAISS to handle larger datasets with partitioned indices.
   - Use advanced embedding models for domain-specific recommendations.

2. **Personalization**:

   - Use user behavior or past searches to personalize recommendations.
   - Add user-provided feedback loops to improve results.

3. **Frontend Improvements**:

   - Add filtering options, pagination, and an interactive UI to refine results.
   - Introduce visual enhancements like product sliders or recommendation grids.

4. **Backend Resilience**:

   - Improve error handling for API failures (e.g., Ollama server unavailability).
   - Cache responses for frequent or repeated queries to improve response time.

5. **Evaluation Metrics**:
   - Develop evaluation frameworks (e.g., precision, recall, or click-through rates) to validate recommendation quality.
