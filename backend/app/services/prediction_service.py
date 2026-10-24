from pathlib import Path

import joblib
import pandas as pd


class PredictionService:
    """
    Reusable service responsible for loading ML artifacts
    and generating predictions.
    """

    def __init__(self):
        # ---------------------------------------------------------
        # Find project root
        # ---------------------------------------------------------

        # prediction_service.py
        # -> services
        # -> app
        # -> backend
        # -> project root
        self.project_root = Path(__file__).resolve().parents[3]

        # ---------------------------------------------------------
        # Model and preprocessor paths
        # ---------------------------------------------------------

        self.model_path = (
            self.project_root
            / "models"
            / "diabetes"
            / "diabetes_model.pkl"
        )

        self.preprocessor_path = (
            self.project_root
            / "models"
            / "diabetes"
            / "preprocessor.pkl"
        )

        # ---------------------------------------------------------
        # Load model and preprocessor
        # ---------------------------------------------------------

        self.model = self._load_artifact(self.model_path)
        self.preprocessor = self._load_artifact(
            self.preprocessor_path
        )

        # Heart
        heart_path = (
            self.project_root
            / "models"
            / "heart_disease"
            / "heart_disease_pipeline.pkl"
        )

        self.heart_pipeline = None

        if heart_path.exists():
            self.heart_pipeline = self._load_artifact(heart_path)

    def _load_artifact(self, path: Path):
        """
        Load a serialized ML artifact using joblib.
        """

        if not path.exists():
            raise FileNotFoundError(
                f"Model artifact not found: {path}"
            )

        return joblib.load(path)

    def predict(
        self,
        disease: str,
        features: dict,
    ):
        """
        Generate prediction for a disease.

        Currently supports:
        - diabetes

        This structure is intentionally reusable so that
        additional diseases can be added later.
        """

        # ---------------------------------------------------------
        # Validate disease
        # ---------------------------------------------------------

        if disease.lower() == "heart-disease":
            if self.heart_pipeline is None:
                raise RuntimeError("Heart disease model is unavailable.")

            input_df = pd.DataFrame([features])
            prediction = int(self.heart_pipeline.predict(input_df)[0])

            probability = (
                float(self.heart_pipeline.predict_proba(input_df)[0][1])
                if hasattr(self.heart_pipeline, "predict_proba")
                else float(prediction)
           )

            return prediction, probability

        if disease.lower() != "diabetes":
            raise ValueError(f"Unsupported disease: {disease}")

        input_df = pd.DataFrame([features])
        transformed_data = self.preprocessor.transform(input_df)

        prediction = int(self.model.predict(transformed_data)[0])

        probability = (
            float(self.model.predict_proba(transformed_data)[0][1])
            if hasattr(self.model, "predict_proba")
            else float(prediction)
    )

        return prediction, probability
            