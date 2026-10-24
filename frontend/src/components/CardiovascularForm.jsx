
import { useState } from "react";
import { predictCardiovascular } from "../services/api";

const initialValues = {
  age: "50.4",
  gender: "1",
  height: "165",
  weight: "70",
  ap_hi: "130",
  ap_lo: "85",
  cholesterol: "2",
  gluc: "1",
  smoke: "0",
  alco: "0",
  active: "1",
};

const fields = [
  { name: "age", label: "Age (years)", type: "number", step: "0.1" },
  { name: "gender", label: "Gender", type: "select", options: [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
  ]},
  { name: "height", label: "Height (cm)", type: "number", step: "0.1" },
  { name: "weight", label: "Weight (kg)", type: "number", step: "0.1" },
  { name: "ap_hi", label: "Systolic BP (ap_hi)", type: "number" },
  { name: "ap_lo", label: "Diastolic BP (ap_lo)", type: "number" },
  { name: "cholesterol", label: "Cholesterol level", type: "select", options: [
    { value: "1", label: "1 - Normal" },
    { value: "2", label: "2 - Above normal" },
    { value: "3", label: "3 - Well above normal" },
  ]},
  { name: "gluc", label: "Glucose level", type: "select", options: [
    { value: "1", label: "1 - Normal" },
    { value: "2", label: "2 - Above normal" },
    { value: "3", label: "3 - Well above normal" },
  ]},
  { name: "smoke", label: "Smoking", type: "select", options: [
    { value: "0", label: "No" },
    { value: "1", label: "Yes" },
  ]},
  { name: "alco", label: "Alcohol consumption", type: "select", options: [
    { value: "0", label: "No" },
    { value: "1", label: "Yes" },
  ]},
  { name: "active", label: "Physically active", type: "select", options: [
    { value: "0", label: "No" },
    { value: "1", label: "Yes" },
  ]},
];

export default function CardiovascularForm({ onResult, onLoading }) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    onLoading?.(true);

    try {
      const payload = {
        age: Number(values.age),
        gender: Number(values.gender),
        height: Number(values.height),
        weight: Number(values.weight),
        ap_hi: Number(values.ap_hi),
        ap_lo: Number(values.ap_lo),
        cholesterol: Number(values.cholesterol),
        gluc: Number(values.gluc),
        smoke: Number(values.smoke),
        alco: Number(values.alco),
        active: Number(values.active),
      };

      const result = await predictCardiovascular(payload);
      onResult(result);
    } catch (err) {
      setError(err.message || "Prediction failed. Please try again.");
    } finally {
      onLoading?.(false);
    }
  };

  
const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: "#111827",
  fontSize: "15px",
  minHeight: "44px",
  outlineOffset: "2px",
};


  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {fields.map((field) => (
          <label key={field.name} style={{ display: "block" }}>
            <span>{field.label}</span>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={values[field.name]}
                onChange={handleChange}
                style={inputStyle}
              >
                
{field.options.map((option) => (
  <option
    key={option.value}
    value={option.value}
    style={{
      backgroundColor: "#ffffff",
      color: "#111827",
    }}
  >
    {option.label}
  </option>
))}

              </select>
            ) : (
              <input
                name={field.name}
                type="number"
                step={field.step || "1"}
                value={values[field.name]}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            )}
          </label>
        ))}
      </div>

      {error && (
        <p role="alert" style={{ color: "#dc2626", marginTop: "16px" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          border: 0,
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Predict Cardiovascular Disease
      </button>

      <p style={{ fontSize: "12px", opacity: 0.75 }}>
        This tool provides a model-based estimate, not a medical diagnosis.
      </p>
    </form>
  );
}
