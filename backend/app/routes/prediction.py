from fastapi import APIRouter, HTTPException

from ..schemas.prediction import (
    DiabetesPredictionRequest,
    DiabetesPredictionResponse,
)

from ..services.prediction_service import PredictionService


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