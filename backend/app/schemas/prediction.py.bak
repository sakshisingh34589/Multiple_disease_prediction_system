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

class HeartDiseasePredictionRequest(BaseModel):
    age: float = Field(..., gt=25, lt=120)
    gender: int = Field(..., ge=1, le=2)
    height: float = Field(..., gt=50, lt=250)
    weight: float = Field(..., gt=10, lt=300)
    ap_hi: int = Field(..., gt=50, lt=250)
    ap_lo: int = Field(..., gt=30, lt=150)
    cholesterol: int = Field(..., ge=1, le=3)
    gluc: int = Field(..., ge=1, le=3)
    smoke: int = Field(..., ge=0, le=1)
    alco: int = Field(..., ge=0, le=1)
    active: int = Field(..., ge=0, le=1)


class HeartDiseasePredictionResponse(BaseModel):
    disease: str
    prediction: int
    probability: float
    message: str