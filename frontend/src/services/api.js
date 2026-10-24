const API_BASE_URL = "http://127.0.0.1:8000";

export async function predictDiabetes(patientData) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/predict/diabetes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Prediction request failed."
    );
  }

  return data;
}

export const predictCardiovascular = async (data) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/predict/heart-disease`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.detail || "Cardiovascular prediction failed."
    );
  }

  return result;
};
