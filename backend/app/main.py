from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.prediction import router as prediction_router


# ---------------------------------------------------------
# FastAPI Application
# ---------------------------------------------------------

app = FastAPI(
    title="Multiple Disease Prediction API",
    description="Reusable machine learning API for disease prediction.",
    version="1.0.0",
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------
# React will later run on a different port.
# These origins allow our local React frontend to
# communicate with the FastAPI backend.
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# Register API routes
# ---------------------------------------------------------

app.include_router(prediction_router)


# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Multiple Disease Prediction API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }