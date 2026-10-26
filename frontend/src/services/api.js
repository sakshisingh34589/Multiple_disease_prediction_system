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
export async function predictParkinsons(patientData) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/predict/parkinsons`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.detail || "Parkinson's prediction failed."
    );
  }

  return result;
}
export async function predictLiverDisease(payload) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/predict/liver-disease",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Liver prediction failed.");
  }

  return data;
}

export async function predictKidneyDisease(patientData) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/predict/kidney-disease`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.detail || "Kidney disease prediction failed."
    );
  }

  return result;
}
