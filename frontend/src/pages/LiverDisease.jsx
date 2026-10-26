
import { useState } from "react";
import { predictLiverDisease } from "../services/api";

const initialForm = {
  Age: "",
  Gender: "Male",
  Total_Bilirubin: "",
  Direct_Bilirubin: "",
  Alkaline_Phosphotase: "",
  Alamine_Aminotransferase: "",
  Aspartate_Aminotransferase: "",
  Total_Protiens: "",
  Albumin: "",
  Albumin_and_Globulin_Ratio: "",
};

const fields = [
  ["Age", "Age", "1"],
  ["Total_Bilirubin", "Total Bilirubin", "any"],
  ["Direct_Bilirubin", "Direct Bilirubin", "any"],
  ["Alkaline_Phosphotase", "Alkaline Phosphotase", "any"],
  ["Alamine_Aminotransferase", "Alamine Aminotransferase", "any"],
  ["Aspartate_Aminotransferase", "Aspartate Aminotransferase", "any"],
  ["Total_Protiens", "Total Proteins", "any"],
  ["Albumin", "Albumin", "any"],
  ["Albumin_and_Globulin_Ratio", "Albumin and Globulin Ratio", "any"],
];

export default function LiverDisease({
  onResult,
  onLoading,
  onError,
}) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    onError("");
    onResult(null);
    onLoading(true);

    try {
      const payload = {
        Age: Number(form.Age),
        Gender: form.Gender,
        Total_Bilirubin: Number(form.Total_Bilirubin),
        Direct_Bilirubin: Number(form.Direct_Bilirubin),
        Alkaline_Phosphotase: Number(form.Alkaline_Phosphotase),
        Alamine_Aminotransferase: Number(form.Alamine_Aminotransferase),
        Aspartate_Aminotransferase: Number(form.Aspartate_Aminotransferase),
        Total_Protiens: Number(form.Total_Protiens),
        Albumin: Number(form.Albumin),
        Albumin_and_Globulin_Ratio: Number(
          form.Albumin_and_Globulin_Ratio
        ),
      };

      const result = await predictLiverDisease(payload);
      onResult(result);
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Liver disease prediction failed. Please try again.";

      onError(
        typeof message === "string" ? message : JSON.stringify(message)
      );
      onResult(null);
    } finally {
      onLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      <div className="form-group">
        <label htmlFor="liver-gender">Gender</label>
        <select
          id="liver-gender"
          name="Gender"
          value={form.Gender}
          onChange={handleChange}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {fields.map(([name, label, step]) => (
        <div className="form-group" key={name}>
          <label htmlFor={`liver-${name}`}>{label}</label>
          <input
            id={`liver-${name}`}
            name={name}
            type="number"
            min="0"
            step={step}
            value={form[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit">Predict Liver Disease Risk</button>

      <p>
        This model provides an estimate for educational purposes, not a
        medical diagnosis.
      </p>
    </form>
  );
}
