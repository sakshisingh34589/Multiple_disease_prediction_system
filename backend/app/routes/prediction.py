from fastapi import APIRouter, HTTPException

from ..schemas.prediction import (
    DiabetesPredictionRequest,
    DiabetesPredictionResponse,
    HeartDiseasePredictionRequest,
    HeartDiseasePredictionResponse,
    ParkinsonsPredictionRequest,
    LiverDiseasePredictionRequest,
    LiverDiseasePredictionResponse,
)
from ..services.prediction_service import PredictionService

router = APIRouter(prefix="/api/v1", tags=["Prediction"])
model_service = PredictionService()


@router.post("/predict/diabetes", response_model=DiabetesPredictionResponse)
def predict_diabetes(request: DiabetesPredictionRequest):
    try:
        prediction, probability = model_service.predict(
            disease="diabetes",
            features=request.model_dump(),
        )
        message = (
            "Diabetes risk detected."
            if prediction == 1
            else "Diabetes risk not detected."
        )
        return DiabetesPredictionResponse(
            disease="diabetes",
            prediction=prediction,
            probability=round(probability, 4),
            message=message,
        )
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Diabetes prediction failed: {str(error)}",
        )


@router.post(
    "/predict/heart-disease",
    response_model=HeartDiseasePredictionResponse,
)
def predict_heart_disease(request: HeartDiseasePredictionRequest):
    try:
        prediction, probability = model_service.predict(
            disease="heart-disease",
            features=request.model_dump(),
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


@router.post("/predict/parkinsons")
def predict_parkinsons(request: ParkinsonsPredictionRequest):
    try:
        features = request.model_dump(by_alias=True)

        prediction, probability = model_service.predict(
            disease="parkinsons",
            features=features,
        )

        message = (
            "Parkinson's disease risk detected."
            if prediction == 1
            else "Parkinson's disease risk not detected."
        )

        return {
            "disease": "parkinsons",
            "prediction": prediction,
            "probability": round(probability, 4),
            "message": message,
        }

    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Parkinson's prediction failed: {str(error)}",
        )
@router.post(
    "/predict/liver-disease",
    response_model=LiverDiseasePredictionResponse
)
def predict_liver_disease(request: LiverDiseasePredictionRequest):
    try:
        prediction, probability = model_service.predict(
            disease="liver-disease",
            features=request.model_dump()
        )

        message = (
            "Liver disease risk detected."
            if prediction == 1
            else "Liver disease risk not detected."
        )

        return LiverDiseasePredictionResponse(
            disease="liver-disease",
            prediction=prediction,
            probability=round(probability, 4),
            message=message
        )

    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Liver disease prediction failed: {str(error)}"
        )