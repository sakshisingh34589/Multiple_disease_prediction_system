
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



class LiverDiseasePredictionRequest(BaseModel):
    Age: int = Field(..., ge=1, le=120)
    Gender: str = Field(..., pattern="^(Male|Female|male|female)$")
    Total_Bilirubin: float = Field(..., ge=0)
    Direct_Bilirubin: float = Field(..., ge=0)
    Alkaline_Phosphotase: float = Field(..., ge=0)
    Alamine_Aminotransferase: float = Field(..., ge=0)
    Aspartate_Aminotransferase: float = Field(..., ge=0)
    Total_Protiens: float = Field(..., ge=0)
    Albumin: float = Field(..., ge=0)
    Albumin_and_Globulin_Ratio: float = Field(..., ge=0)


class LiverDiseasePredictionResponse(BaseModel):
    disease: str
    prediction: int
    probability: float
    message: str

class KidneyDiseasePredictionRequest(BaseModel):
    age: float = Field(..., ge=0, le=120)
    gender: str = Field(..., pattern="^(Male|Female)$")
    ethnicity: str = Field(
        ...,
        pattern=(
            "^(Non-Hispanic Asian|Non-Hispanic White|Other Hispanic|"
            "Other/Multiracial|Mexican American|Non-Hispanic Black)$"
        ),
    )
    education_level: float = Field(..., ge=1, le=9)
    poverty_income_ratio: float = Field(..., ge=0)
    bmi: float = Field(..., ge=0)
    weight_kg: float = Field(..., ge=0)
    height_cm: float = Field(..., ge=0)
    bp_systolic: float = Field(..., ge=0)
    bp_diastolic: float = Field(..., ge=0)
    serum_creatinine: float = Field(..., ge=0)
    blood_urea_nitrogen: float = Field(..., ge=0)
    albumin_serum: float = Field(..., ge=0)
    phosphorus: float = Field(..., ge=0)
    bicarbonate: float = Field(..., ge=0)
    calcium: float = Field(..., ge=0)
    uric_acid: float = Field(..., ge=0)
    urine_creatinine: float = Field(..., ge=0)
    urine_albumin: float = Field(..., ge=0)
    albumin_creatinine_ratio: float = Field(..., ge=0)
    diabetes_diagnosed: float = Field(..., ge=1, le=9)
    ever_smoked: float = Field(..., ge=1, le=9)


class KidneyDiseasePredictionResponse(BaseModel):
    disease: str
    prediction: int
    probability: float
    message: str


class LungDiseasePredictionRequest(BaseModel):
    GENDER: int = Field(..., ge=0, le=1)
    AGE: int = Field(..., ge=1, le=120)
    SMOKING: int = Field(..., ge=0, le=1)
    YELLOW_FINGERS: int = Field(..., ge=0, le=1)
    ANXIETY: int = Field(..., ge=0, le=1)
    PEER_PRESSURE: int = Field(..., ge=0, le=1)
    CHRONIC_DISEASE: int = Field(..., alias="CHRONIC DISEASE", ge=0, le=1)
    FATIGUE: int = Field(..., alias="FATIGUE ", ge=0, le=1)
    ALLERGY: int = Field(..., alias="ALLERGY ", ge=0, le=1)
    WHEEZING: int = Field(..., ge=0, le=1)
    ALCOHOL_CONSUMING: int = Field(
        ..., alias="ALCOHOL CONSUMING", ge=0, le=1
    )
    COUGHING: int = Field(..., ge=0, le=1)
    SHORTNESS_OF_BREATH: int = Field(
        ..., alias="SHORTNESS OF BREATH", ge=0, le=1
    )
    SWALLOWING_DIFFICULTY: int = Field(
        ..., alias="SWALLOWING DIFFICULTY", ge=0, le=1
    )
    CHEST_PAIN: int = Field(..., alias="CHEST PAIN", ge=0, le=1)

    model_config = ConfigDict(populate_by_name=True)


class LungDiseasePredictionResponse(BaseModel):
    disease: str
    prediction: int
    probability: float
    message: str

