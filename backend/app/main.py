from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from backend.app.api.endpoints import recommendation

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(recommendation.router, prefix="/api")
print(app.routes)
