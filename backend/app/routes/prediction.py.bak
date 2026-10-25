from fastapi import APIRouter, HTTPException

from ..schemas.prediction import (
    DiabetesPredictionRequest,
    DiabetesPredictionResponse,
)

from ..services.prediction_service import PredictionService
from ..schemas.prediction import (
    DiabetesPredictionRequest,
    DiabetesPredictionResponse,
    HeartDiseasePredictionRequest,
    HeartDiseasePredictionResponse,
)

# ---------------------------------------------------------
# Create router
# ---------------------------------------------------------

router = APIRouter(
    prefix="/api/v1",
    tags=["Prediction"],
)


# ---------------------------------------------------------
# Create prediction service
# ---------------------------------------------------------

model_service = PredictionService()


# ---------------------------------------------------------
# Diabetes prediction endpoint
# ---------------------------------------------------------

@router.post(
    "/predict/diabetes",
    response_model=DiabetesPredictionResponse,
)
def predict_diabetes(
    request: DiabetesPredictionRequest,
):
    """
    Predict diabetes using the trained ML model.
    """

    try:

        # Convert validated request into dictionary
        features = request.model_dump()

        # Generate prediction
        prediction, probability = model_service.predict(
            disease="diabetes",
            features=features,
        )

        # Convert prediction into readable message
        if prediction == 1:
            message = "Diabetes risk detected."
        else:
            message = "Diabetes risk not detected."

        return DiabetesPredictionResponse(
            disease="diabetes",
            prediction=prediction,
            probability=round(probability, 4),
            message=message,
        )

    except FileNotFoundError as error:

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(error)}",
        )
@router.post(
    "/predict/heart-disease",
    response_model=HeartDiseasePredictionResponse,
)
def predict_heart_disease(
    request: HeartDiseasePredictionRequest,
):
    try:
        features = request.model_dump()

        prediction, probability = model_service.predict(
            disease="heart-disease",
            features=features,
        )

        message = (
            "Heart disease risk detected."
            if prediction == 1
            else "Heart disease risk not detected."
        )

        return HeartDiseasePredictionResponse(
            disease="heart-disease",
            prediction=prediction,
            probability=round(probability, 4),
            message=message,
        )

    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Heart disease prediction failed.",
        )