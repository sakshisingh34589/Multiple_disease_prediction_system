
import json
from pathlib import Path

import joblib

base = Path("models/parkinsons")

model_path = base / "parkinsons_model.pkl"
preprocessor_path = base / "preprocessor.pkl"
metadata_path = base / "parkinsons_metadata.json"


def inspect_object(label, obj):
    print(f"\n--- {label} ---")
    print("Type:", type(obj).__name__)

    if hasattr(obj, "n_features_in_"):
        print("Input feature count:", obj.n_features_in_)

    if hasattr(obj, "feature_names_in_"):
        print("Input feature names:")
        print(list(obj.feature_names_in_))

    if hasattr(obj, "classes_"):
        print("Classes:", list(obj.classes_))

    if hasattr(obj, "steps"):
        print("Pipeline steps:", [name for name, _ in obj.steps])


for path in [model_path, preprocessor_path, metadata_path]:
    print(f"{path}: {'FOUND' if path.exists() else 'MISSING'}")

if not all(p.exists() for p in [model_path, preprocessor_path, metadata_path]):
    raise SystemExit("STOP: One or more expected files are missing.")

with metadata_path.open("r", encoding="utf-8") as f:
    metadata = json.load(f)

print("\n--- Metadata JSON ---")
print(json.dumps(metadata, indent=2))

model = joblib.load(model_path)
preprocessor = joblib.load(preprocessor_path)

inspect_object("Parkinson's model", model)
inspect_object("Parkinson's preprocessor", preprocessor)

print("\nArtifact loading check completed.")
