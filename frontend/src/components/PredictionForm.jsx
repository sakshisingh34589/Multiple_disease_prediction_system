import { useState } from "react";
import { predictDiabetes } from "../services/api";

const initialFormData = {
  Pregnancies: "",
  Glucose: "",
  BloodPressure: "",
  SkinThickness: "",
  Insulin: "",
  BMI: "",
  DiabetesPedigreeFunction: "",
  Age: "",
};

function PredictionForm({ onResult, onLoading, onError }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    onError("");
    onLoading(true);

    try {
      const payload = {
        Pregnancies: Number(formData.Pregnancies),
        Glucose: Number(formData.Glucose),
        BloodPressure: Number(formData.BloodPressure),
        SkinThickness: Number(formData.SkinThickness),
        Insulin: Number(formData.Insulin),
        BMI: Number(formData.BMI),
        DiabetesPedigreeFunction: Number(
          formData.DiabetesPedigreeFunction
        ),
        Age: Number(formData.Age),
      };

      const result = await predictDiabetes(payload);

      onResult(result);
    } catch (error) {
      onError(error.message);
      onResult(null);
    } finally {
      onLoading(false);
    }
  };

  const fields = [
    {
      name: "Pregnancies",
      label: "Pregnancies",
      type: "number",
    },
    {
      name: "Glucose",
      label: "Glucose",
      type: "number",
    },
    {
      name: "BloodPressure",
      label: "Blood Pressure",
      type: "number",
    },
    {
      name: "SkinThickness",
      label: "Skin Thickness",
      type: "number",
    },
    {
      name: "Insulin",
      label: "Insulin",
      type: "number",
    },
    {
      name: "BMI",
      label: "BMI",
      type: "number",
      step: "0.1",
    },
    {
      name: "DiabetesPedigreeFunction",
      label: "Diabetes Pedigree Function",
      type: "number",
      step: "0.01",
    },
    {
      name: "Age",
      label: "Age",
      type: "number",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label htmlFor={field.name}>
            {field.label}
          </label>

          <input
            id={field.name}
            name={field.name}
            type={field.type}
            step={field.step || "1"}
            value={formData[field.name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit">
        Predict Diabetes Risk
      </button>
    </form>
  );
}

export default PredictionForm;