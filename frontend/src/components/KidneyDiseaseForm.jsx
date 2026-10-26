
import { useState } from "react";
import { predictKidneyDisease } from "../services/api";

const initialValues = {
  age: "45",
  gender: "Male",
  ethnicity: "Non-Hispanic White",
  education_level: "5",
  poverty_income_ratio: "2",
  bmi: "25",
  weight_kg: "70",
  height_cm: "170",
  bp_systolic: "120",
  bp_diastolic: "80",
  serum_creatinine: "1",
  blood_urea_nitrogen: "15",
  albumin_serum: "4",
  phosphorus: "3.5",
  bicarbonate: "24",
  calcium: "9.5",
  uric_acid: "5",
  urine_creatinine: "100",
  urine_albumin: "10",
  albumin_creatinine_ratio: "10",
  diabetes_diagnosed: "2",
  ever_smoked: "2",
};

const numericFields = [
  ["age", "Age (years)"],
  ["education_level", "Education level code"],
  ["poverty_income_ratio", "Poverty-income ratio"],
  ["bmi", "BMI"],
  ["weight_kg", "Weight (kg)"],
  ["height_cm", "Height (cm)"],
  ["bp_systolic", "Systolic blood pressure"],
  ["bp_diastolic", "Diastolic blood pressure"],
  ["serum_creatinine", "Serum creatinine"],
  ["blood_urea_nitrogen", "Blood urea nitrogen"],
  ["albumin_serum", "Serum albumin"],
  ["phosphorus", "Phosphorus"],
  ["bicarbonate", "Bicarbonate"],
  ["calcium", "Calcium"],
  ["uric_acid", "Uric acid"],
  ["urine_creatinine", "Urine creatinine"],
  ["urine_albumin", "Urine albumin"],
  ["albumin_creatinine_ratio", "Albumin-creatinine ratio"],
  ["diabetes_diagnosed", "Diabetes diagnosis code"],
  ["ever_smoked", "Smoking history code"],
];

const ethnicities = [
  "Non-Hispanic Asian",
  "Non-Hispanic White",
  "Other Hispanic",
  "Other/Multiracial",
  "Mexican American",
  "Non-Hispanic Black",
];

function KidneyDiseaseForm({ onResult, onLoading, onError, loading }) {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    onLoading(true);
    setError("");
    onError("");
    onResult(null);

    const payload = {
      ...form,
      age: Number(form.age),
      education_level: Number(form.education_level),
      poverty_income_ratio: Number(form.poverty_income_ratio),
      bmi: Number(form.bmi),
      weight_kg: Number(form.weight_kg),
      height_cm: Number(form.height_cm),
      bp_systolic: Number(form.bp_systolic),
      bp_diastolic: Number(form.bp_diastolic),
      serum_creatinine: Number(form.serum_creatinine),
      blood_urea_nitrogen: Number(form.blood_urea_nitrogen),
      albumin_serum: Number(form.albumin_serum),
      phosphorus: Number(form.phosphorus),
      bicarbonate: Number(form.bicarbonate),
      calcium: Number(form.calcium),
      uric_acid: Number(form.uric_acid),
      urine_creatinine: Number(form.urine_creatinine),
      urine_albumin: Number(form.urine_albumin),
      albumin_creatinine_ratio: Number(form.albumin_creatinine_ratio),
      diabetes_diagnosed: Number(form.diabetes_diagnosed),
      ever_smoked: Number(form.ever_smoked),
    };

    
    try {
      const data = await predictKidneyDisease(payload);
      onResult(data);
    } catch (err) {
      const message =
        err.message || "Prediction failed. Please try again.";
      setError(message);
      onError(message);
    } finally {
      onLoading(false);
    }

  }

  return (
    <section className="kidney-prediction-form">
      <h2>Kidney Disease Prediction</h2>
      <p>
        Enter the required health measurements to obtain a model-generated
        risk estimate. This is not a medical diagnosis.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="kidney-form-grid">
          <label>
            Gender
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label>
            Ethnicity
            <select
              name="ethnicity"
              value={form.ethnicity}
              onChange={handleChange}
            >
              {ethnicities.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          {numericFields.map(([name, label]) => {
            const options =
              name === "education_level" ? ["1", "2", "3", "4", "5", "9"] :
              name === "diabetes_diagnosed" ? ["1", "2", "3", "9"] :
              name === "ever_smoked" ? ["1", "2", "7", "9"] :
              null;

            return (
              <label key={name}>
                {label}
                {options ? (
                  <select
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    required
                  />
                )}
              </label>
            );
          })}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict Kidney Disease Risk"}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}

    </section>
  );
}

export default KidneyDiseaseForm;
