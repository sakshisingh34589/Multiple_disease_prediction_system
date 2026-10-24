from pydantic import BaseModel, Field


class DiabetesPredictionRequest(BaseModel):
    """
    Input schema for diabetes prediction.

    The field names MUST match the features used
    during model training.
    """

    Pregnancies: int = Field(..., ge=0)
    Glucose: float = Field(..., ge=0)
    BloodPressure: float = Field(..., ge=0)
    SkinThickness: float = Field(..., ge=0)
    Insulin: float = Field(..., ge=0)
    BMI: float = Field(..., ge=0)
    DiabetesPedigreeFunction: float = Field(..., ge=0)
    Age: int = Field(..., ge=1)


class DiabetesPredictionResponse(BaseModel):
    """
    Standard response returned by the prediction API.
    """

    disease: str
    prediction: int
    probability: float
    message: str