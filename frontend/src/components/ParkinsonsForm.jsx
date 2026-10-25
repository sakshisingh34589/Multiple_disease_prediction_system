
import { useState } from "react";
import { predictParkinsons } from "../services/api";

const fields = [
  { name: "MDVP:Fo(Hz)", label: "MDVP Fundamental Frequency (Hz)", step: "any" },
  { name: "MDVP:Fhi(Hz)", label: "Maximum Vocal Frequency (Hz)", step: "any" },
  { name: "MDVP:Flo(Hz)", label: "Minimum Vocal Frequency (Hz)", step: "any" },
  { name: "MDVP:Jitter(%)", label: "Jitter (%)", step: "any" },
  { name: "MDVP:Jitter(Abs)", label: "Jitter (Absolute)", step: "any" },
  { name: "MDVP:RAP", label: "Relative Amplitude Perturbation (RAP)", step: "any" },
  { name: "MDVP:PPQ", label: "Pitch Perturbation Quotient (PPQ)", step: "any" },
  { name: "Jitter:DDP", label: "Jitter DDP", step: "any" },
  { name: "MDVP:Shimmer", label: "Shimmer", step: "any" },
  { name: "MDVP:Shimmer(dB)", label: "Shimmer (dB)", step: "any" },
  { name: "Shimmer:APQ3", label: "Shimmer APQ3", step: "any" },
  { name: "Shimmer:APQ5", label: "Shimmer APQ5", step: "any" },
  { name: "MDVP:APQ", label: "Amplitude Perturbation Quotient (APQ)", step: "any" },
  { name: "Shimmer:DDA", label: "Shimmer DDA", step: "any" },
  { name: "NHR", label: "Noise-to-Harmonics Ratio (NHR)", step: "any" },
  { name: "HNR", label: "Harmonics-to-Noise Ratio (HNR)", step: "any" },
  { name: "RPDE", label: "RPDE", step: "any" },
  { name: "DFA", label: "DFA", step: "any" },
  { name: "spread1", label: "Spread 1", step: "any" },
  { name: "spread2", label: "Spread 2", step: "any" },
  { name: "D2", label: "D2", step: "any" },
  { name: "PPE", label: "Pitch Period Entropy (PPE)", step: "any" },
];

const initialFormData = Object.fromEntries(
  fields.map((field) => [field.name, ""])
);

function ParkinsonsForm({ onResult, onLoading, onError }) {
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
    onResult(null);
    onLoading(true);

    try {
      const payload = Object.fromEntries(
        fields.map((field) => [
          field.name,
          Number(formData[field.name]),
        ])
      );

      const result = await predictParkinsons(payload);
      onResult(result);
    } catch (error) {
      onError(
        error?.message || "Parkinson's prediction failed. Please try again."
      );
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label htmlFor={`parkinsons-${field.name}`}>
            {field.label}
          </label>

          <input
            id={`parkinsons-${field.name}`}
            name={field.name}
            type="number"
            step={field.step}
            value={formData[field.name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit">
        Predict Parkinson's Risk
      </button>
    </form>
  );
}

export default ParkinsonsForm;
