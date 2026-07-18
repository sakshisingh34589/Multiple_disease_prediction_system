# Preprocessing Module
"""
This module is responsible for:
1. Loading dataset
2. Cleaning data
3. Handling missing values
4. Removing outliers
5. Feature Scaling
6. Creating preprocessing pipeline
7. Saving preprocessor
This module is reusable for every disease dataset.
"""
# Import Libraries

from pathlib import Path
import logging
import joblib
import numpy as np
import pandas as pd

from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

from src.outlier_remover import OutlierRemover
# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)
logger = logging.getLogger(__name__)

# Project Paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = PROJECT_ROOT / "data" / "raw" / "diabetes.csv"
MODEL_PATH = PROJECT_ROOT / "models"
PREPROCESSOR_PATH = MODEL_PATH / "preprocessor.pkl"

# Feature Columns
FEATURE_COLUMNS = [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age"
]
TARGET_COLUMN = "Outcome"

# Medically Impossible Zero Value Columns

INVALID_ZERO_COLUMNS = [
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI"
]

# Load Dataset
def load_dataset(file_path: Path) -> pd.DataFrame:
    """
    Load dataset from the given path.

    Parameters
    ----------
    file_path : Path
        Path of the CSV dataset.

    Returns
    -------
    pd.DataFrame
        Loaded dataset.
    """

    logger.info("Loading dataset...")

    try:
        df = pd.read_csv(file_path)

        logger.info(f"Dataset loaded successfully.")
        logger.info(f"Dataset Shape : {df.shape}")

        return df

    except FileNotFoundError:
        logger.error(f"Dataset not found : {file_path}")
        raise

    except Exception as e:
        logger.error(f"Error while loading dataset : {e}")
        raise

# Replace Invalid Zero Values
def replace_invalid_zeros(
    df: pd.DataFrame,
    columns: list
) -> pd.DataFrame:
    """
    Replace medically impossible zero values with NaN.

    Parameters
    ----------
    df : pd.DataFrame
        Input dataframe.

    columns : list
        Columns where zero is considered missing.

    Returns
    -------
    pd.DataFrame
    """

    logger.info("Replacing invalid zero values with NaN...")

    df = df.copy()

    for column in columns:

        if column in df.columns:

            zero_count = (df[column] == 0).sum()

            logger.info(f"{column} -> {zero_count} invalid zeros found.")

            df[column] = df[column].replace(0, np.nan)

    logger.info("Invalid zero replacement completed.")

    return df

# Split Features and Target
def split_features_target(
    df: pd.DataFrame
):
    """
    Split dataframe into features and target.
    """

    logger.info("Splitting Features and Target...")

    X = df[FEATURE_COLUMNS]

    y = df[TARGET_COLUMN]

    logger.info(f"Features Shape : {X.shape}")

    logger.info(f"Target Shape : {y.shape}")

    return X, y

# Train Test Split
from sklearn.model_selection import train_test_split


def split_train_test(
    X,
    y,
    test_size=0.20,
    random_state=42
):
    """
    Split dataset into train and test.
    """

    logger.info("Splitting dataset into Train and Test...")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=random_state,
        stratify=y
    )

    logger.info(f"Train Shape : {X_train.shape}")

    logger.info(f"Test Shape : {X_test.shape}")

    return X_train, X_test, y_train, y_test

# Build Preprocessing Pipeline
def build_preprocessor() -> ColumnTransformer:
    """
    Create a reusable preprocessing pipeline.

    Pipeline Steps:
    1. Outlier Removal
    2. Missing Value Imputation
    3. Feature Scaling
    """

    logger.info("Building preprocessing pipeline...")

    numerical_pipeline = Pipeline(
        steps=[
            (
                "outlier_remover",
                OutlierRemover()
            ),

            (
                "imputer",
                SimpleImputer(strategy="median")
            ),

            (
                "scaler",
                StandardScaler()
            )
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "numerical_features",
                numerical_pipeline,
                FEATURE_COLUMNS
            )
        ]
    )

    logger.info("Preprocessing pipeline created successfully.")

    return preprocessor

# Apply Preprocessing
def preprocess_data(
    preprocessor,
    X_train,
    X_test
):
    """
    Fit the preprocessor on training data
    and transform both train and test data.
    """

    logger.info("Applying preprocessing...")

    X_train_processed = preprocessor.fit_transform(X_train)

    X_test_processed = preprocessor.transform(X_test)

    logger.info("Preprocessing completed successfully.")

    return X_train_processed, X_test_processed

# Save Preprocessor
def save_preprocessor(
    preprocessor,
    save_path: Path
):
    """
    Save preprocessing pipeline.
    """

    logger.info("Saving preprocessing pipeline...")

    save_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    joblib.dump(
        preprocessor,
        save_path
    )

    logger.info(f"Preprocessor saved at : {save_path}")

# Verify Saved Preprocessor
def load_preprocessor(
    file_path: Path
):
    """
    Load saved preprocessing pipeline.
    """

    logger.info("Loading saved preprocessor...")

    preprocessor = joblib.load(file_path)

    logger.info("Preprocessor loaded successfully.")

    return preprocessor

# Step 14: Main Function
def main():
    """
    Execute the complete preprocessing workflow.
    """

    logger.info("=" * 60)
    logger.info("Starting Data Preprocessing Pipeline")
    logger.info("=" * 60)
    # Step 1 : Load Dataset
    df = load_dataset(DATA_PATH)
    # Step 2 : Replace Invalid Zero Values
    df = replace_invalid_zeros(
        df,
        INVALID_ZERO_COLUMNS
    )
    # Step 3 : Split Features & Target
    X, y = split_features_target(df)
    # Step 4 : Train Test Split
    X_train, X_test, y_train, y_test = split_train_test(
        X,
        y
    )
    # Step 5 : Build Preprocessor
    preprocessor = build_preprocessor()
    # Step 6 : Apply Preprocessing
    X_train_processed, X_test_processed = preprocess_data(
        preprocessor,
        X_train,
        X_test
    )
    # Step 7 : Save Preprocessor
    save_preprocessor(
        preprocessor,
        PREPROCESSOR_PATH
    )
    logger.info("=" * 60)
    logger.info("Preprocessing Completed Successfully")
    logger.info("=" * 60)
    return (
        X_train_processed,
        X_test_processed,
        y_train,
        y_test
    )
# Step 15: Execute Main Function
if __name__ == "__main__":
    main()