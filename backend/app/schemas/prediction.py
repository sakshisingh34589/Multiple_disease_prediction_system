
from pydantic import BaseModel, ConfigDict, Field


class DiabetesPredictionRequest(BaseModel):
    Pregnancies: int = Field(..., ge=0)
    Glucose: float = Field(..., ge=0)
    BloodPressure: float = Field(..., ge=0)
    SkinThickness: float = Field(..., ge=0)
    Insulin: float = Field(..., ge=0)
    BMI: float = Field(..., ge=0)
    DiabetesPedigreeFunction: float = Field(..., ge=0)
    Age: int = Field(..., ge=1)


class DiabetesPredictionResponse(BaseModel):
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


class ParkinsonsPredictionRequest(BaseModel):
    # Accept both Python field names and original dataset column names.
    model_config = ConfigDict(populate_by_name=True)

    MDVP_Fo_Hz: float = Field(..., alias="MDVP:Fo(Hz)")
    MDVP_Fhi_Hz: float = Field(..., alias="MDVP:Fhi(Hz)")
    MDVP_Flo_Hz: float = Field(..., alias="MDVP:Flo(Hz)")
    MDVP_Jitter_percent: float = Field(..., alias="MDVP:Jitter(%)")
    MDVP_Jitter_Abs: float = Field(..., alias="MDVP:Jitter(Abs)")
    MDVP_RAP: float = Field(..., alias="MDVP:RAP")
    MDVP_PPQ: float = Field(..., alias="MDVP:PPQ")
    Jitter_DDP: float = Field(..., alias="Jitter:DDP")
    MDVP_Shimmer: float = Field(..., alias="MDVP:Shimmer")
    MDVP_Shimmer_dB: float = Field(..., alias="MDVP:Shimmer(dB)")
    Shimmer_APQ3: float = Field(..., alias="Shimmer:APQ3")
    Shimmer_APQ5: float = Field(..., alias="Shimmer:APQ5")
    MDVP_APQ: float = Field(..., alias="MDVP:APQ")
    Shimmer_DDA: float = Field(..., alias="Shimmer:DDA")
    NHR: float
    HNR: float
    RPDE: float
    DFA: float
    spread1: float
    spread2: float
    D2: float
    PPE: float


