
import { useState } from "react";
import { predictLungDisease } from "../services/api";

const initialFormData = {
  GENDER: "",
  AGE: "",
  SMOKING: "",
  YELLOW_FINGERS: "",
  ANXIETY: "",
  PEER_PRESSURE: "",
  CHRONIC_DISEASE: "",
  FATIGUE: "",
  ALLERGY: "",
  WHEEZING: "",
  ALCOHOL_CONSUMING: "",
  COUGHING: "",
  SHORTNESS_OF_BREATH: "",
  SWALLOWING_DIFFICULTY: "",
  CHEST_PAIN: "",
};

const binaryFields = [
  { name: "SMOKING", label: "Do you smoke?" },
  { name: "YELLOW_FINGERS", label: "Yellow fingers" },
  { name: "ANXIETY", label: "Anxiety" },
  { name: "PEER_PRESSURE", label: "Peer pressure" },
  { name: "CHRONIC_DISEASE", label: "Chronic disease history" },
  { name: "FATIGUE", label: "Frequent fatigue" },
  { name: "ALLERGY", label: "Allergy history" },
  { name: "WHEEZING", label: "Wheezing" },
  { name: "ALCOHOL_CONSUMING", label: "Alcohol consumption" },
  { name: "COUGHING", label: "Coughing" },
  { name: "SHORTNESS_OF_BREATH", label: "Shortness of breath" },
  { name: "SWALLOWING_DIFFICULTY", label: "Swallowing difficulty" },
  { name: "CHEST_PAIN", label: "Chest pain" },
];

export default function LungDisease({ onResult, onLoading, onError }) {
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
      const payload = {
        GENDER: Number(formData.GENDER),
        AGE: Number(formData.AGE),
        SMOKING: Number(formData.SMOKING),
        YELLOW_FINGERS: Number(formData.YELLOW_FINGERS),
        ANXIETY: Number(formData.ANXIETY),
        PEER_PRESSURE: Number(formData.PEER_PRESSURE),
        "CHRONIC DISEASE": Number(formData.CHRONIC_DISEASE),
        "FATIGUE ": Number(formData.FATIGUE),
        "ALLERGY ": Number(formData.ALLERGY),
        WHEEZING: Number(formData.WHEEZING),
        "ALCOHOL CONSUMING": Number(formData.ALCOHOL_CONSUMING),
        COUGHING: Number(formData.COUGHING),
        "SHORTNESS OF BREATH": Number(formData.SHORTNESS_OF_BREATH),
        "SWALLOWING DIFFICULTY": Number(formData.SWALLOWING_DIFFICULTY),
        "CHEST PAIN": Number(formData.CHEST_PAIN),
      };

      const result = await predictLungDisease(payload);
      onResult(result);
    } catch (error) {
      onError(
        error?.message || "Lung cancer prediction failed. Please try again."
      );
      onResult(null);
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      <div className="form-group">
        <label htmlFor="GENDER">Gender</label>
        <select
          id="GENDER"
          name="GENDER"
          value={formData.GENDER}
          onChange={handleChange}
          required
        >
          <option value="">Select gender</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="AGE">Age</label>
        <input
          id="AGE"
          name="AGE"
          type="number"
          min="1"
          max="120"
          step="1"
          value={formData.AGE}
          onChange={handleChange}
          required
        />
      </div>

      {binaryFields.map((field) => (
        <div className="form-group" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
          >
            <option value="">Select an answer</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
      ))}

      <button type="submit">Assess Lung Cancer Risk</button>

      <p className="form-disclaimer">
        Educational risk estimate only. This result cannot diagnose or rule
        out lung cancer. Consult a qualified healthcare professional for
        medical advice.
      </p>
    </form>
  );
}
