from pathlib import Path

import joblib
import pandas as pd


class PredictionService:
    def __init__(self):
        self.project_root = Path(__file__).resolve().parents[3]

        # Diabetes model
        diabetes_model_path = (
            self.project_root / "models" / "diabetes" / "diabetes_model.pkl"
        )
        diabetes_preprocessor_path = (
            self.project_root / "models" / "diabetes" / "preprocessor.pkl"
        )

        self.model = self._load_artifact(diabetes_model_path)
        self.preprocessor = self._load_artifact(diabetes_preprocessor_path)

        # Heart disease model
        heart_path = (
            self.project_root
            / "models"
            / "heart_disease"
            / "heart_disease_pipeline.pkl"
        )
        self.heart_pipeline = (
            self._load_artifact(heart_path) if heart_path.exists() else None
        )

        # Parkinson's disease model
        parkinsons_model_path = (
            self.project_root
            / "models"
            / "parkinsons"
            / "parkinsons_model.pkl"
        )
        parkinsons_preprocessor_path = (
            self.project_root
            / "models"
            / "parkinsons"
            / "preprocessor.pkl"
        )

        self.parkinsons_model = (
            self._load_artifact(parkinsons_model_path)
            if parkinsons_model_path.exists()
            else None
        )
        self.parkinsons_preprocessor = (
            self._load_artifact(parkinsons_preprocessor_path)
            if parkinsons_preprocessor_path.exists()
            else None
        )

    def _load_artifact(self, path: Path):
        if not path.exists():
            raise FileNotFoundError(f"Model artifact not found: {path}")
        return joblib.load(path)

    def _get_probability(self, model, transformed_data, prediction):
        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(transformed_data)[0]
            classes = list(model.classes_)

            if 1 in classes:
                return float(probabilities[classes.index(1)])

        return float(prediction)

    def predict(self, disease: str, features: dict):
        disease = disease.lower()

        # Heart disease prediction
        if disease == "heart-disease":
            if self.heart_pipeline is None:
                raise RuntimeError("Heart disease model is unavailable.")

            input_df = pd.DataFrame([features])
            prediction = int(self.heart_pipeline.predict(input_df)[0])
            probability = self._get_probability(
                self.heart_pipeline, input_df, prediction
            )
            return prediction, probability

        # Parkinson's disease prediction
        if disease in ("parkinsons", "parkinson's", "parkinsons-disease"):
            if (
                self.parkinsons_model is None
                or self.parkinsons_preprocessor is None
            ):
                raise RuntimeError("Parkinson's disease model is unavailable.")

            input_df = pd.DataFrame([features])
            transformed_data = self.parkinsons_preprocessor.transform(input_df)

            prediction = int(
                self.parkinsons_model.predict(transformed_data)[0]
            )
            probability = self._get_probability(
                self.parkinsons_model, transformed_data, prediction
            )
            return prediction, probability

        # Diabetes prediction
        if disease != "diabetes":
            raise ValueError(f"Unsupported disease: {disease}")

        input_df = pd.DataFrame([features])
        transformed_data = self.preprocessor.transform(input_df)
        prediction = int(self.model.predict(transformed_data)[0])
        probability = self._get_probability(
            self.model, transformed_data, prediction
        )

        return prediction, probability
