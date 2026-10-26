import { useState } from "react";
import PredictionResult from "./components/PredictionResult";
import Diabetes from "./pages/Diabetes";
import HeartDisease from "./pages/HeartDisease";
import Parkinsons from "./pages/Parkinsons";
import LiverDisease from "./pages/LiverDisease";
import "./App.css";

const diseases = [
  {
    id: "diabetes",
    name: "Diabetes",
    icon: "🩸",
    description: "Predict diabetes risk using clinical parameters.",
    status: "active",
  },
  {
    id: "heart",
    name: "Cardiovascular Disease",
    icon: "❤️",
    description: "Cardiovascular disease risk prediction.",
    status: "active",
  },
  {
    id: "kidney",
    name: "Kidney Disease",
    icon: "🫘",
    description: "Kidney disease risk assessment.",
    status: "coming",
  },
  {
    id: "liver",
    name: "Liver Disease",
    icon: "🫀",
    description: "Liver disease prediction.",
    status: "active",
  },
  {
    id: "parkinson",
    name: "Parkinson's",
    icon: "🧠",
    description: "Parkinson's disease prediction.",
    status: "active",
  },
  {
    id: "lung",
    name: "Lung Disease",
    icon: "🫁",
    description: "Lung disease risk assessment.",
    status: "coming",
  },
];

function App() {
  const [selectedDisease, setSelectedDisease] = useState("diabetes");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeDisease = diseases.find(
    (disease) => disease.id === selectedDisease
  );

  const handleDiseaseChange = (disease) => {
    if (disease.status === "coming") return;

    setSelectedDisease(disease.id);
    setResult(null);
    setError("");
  };

  return (
    <div className="app">

      {/* Animated Background */}
      <div className="background-effects">
        <div className="orb orb-one"></div>
        <div className="orb orb-two"></div>
        <div className="orb orb-three"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">✚</div>

          <div>
            <h2>MedPredict</h2>
            <span>AI Healthcare Intelligence</span>
          </div>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          AI System Online
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">

        <div className="hero-badge">
          ✨ AI-Powered Healthcare Prediction
        </div>

        <h1>
          Understand Your Health
          <span> With Intelligent AI</span>
        </h1>

        <p>
          An intelligent machine learning platform designed to
          analyze health parameters and provide preliminary
          disease risk predictions.
        </p>

        <div className="hero-stats">

          <div className="stat-card">
            <strong>6+</strong>
            <span>Diseases</span>
          </div>

          <div className="stat-card">
            <strong>ML</strong>
            <span>Powered</span>
          </div>

          <div className="stat-card">
            <strong>24/7</strong>
            <span>Available</span>
          </div>

        </div>

      </section>

      {/* Disease Selection */}
      <section className="disease-section">

        <div className="section-heading">
          <div>
            <span className="section-label">PREDICTION CENTER</span>

            <h2>Select a Health Condition</h2>

            <p>
              Choose a disease to start your risk assessment.
            </p>
          </div>
        </div>

        <div className="disease-grid">

          {diseases.map((disease) => (

            <button
              key={disease.id}
              className={`disease-card ${
                selectedDisease === disease.id
                  ? "selected"
                  : ""
              } ${
                disease.status === "coming"
                  ? "disabled"
                  : ""
              }`}
              onClick={() => handleDiseaseChange(disease)}
            >

              <div className="disease-icon">
                {disease.icon}
              </div>

              <div className="disease-info">

                <h3>{disease.name}</h3>

                <p>{disease.description}</p>

                {disease.status === "active" ? (
                  <span className="available">
                    ● Available
                  </span>
                ) : (
                  <span className="coming">
                    🔒 Coming Soon
                  </span>
                )}

              </div>

              <div className="card-arrow">
                →
              </div>

            </button>

          ))}

        </div>

      </section>

      {/* Prediction Area */}
      <main className="prediction-section">

        <div className="prediction-header">

          <div className="selected-disease-icon">
            {activeDisease.icon}
          </div>

          <div>
            <span className="section-label">
              ACTIVE MODEL
            </span>

            <h2>
              {activeDisease.name} Prediction
            </h2>

            <p>
              Enter the required clinical parameters below.
            </p>
          </div>

          <div className="model-badge">
            <span></span>
            Model Ready
          </div>

        </div>

        <div className="prediction-container">

          <div className="form-panel">

            <div className="panel-title">
              <span>01</span>
              Patient Information
            </div>

            
{selectedDisease === "diabetes" ? (
  <Diabetes
    onResult={setResult}
    onLoading={setLoading}
    onError={setError}
  />
) : selectedDisease === "heart" ? (
  <HeartDisease
    onResult={setResult}
    onLoading={setLoading}
  />
) : selectedDisease === "parkinson" ? (
  <Parkinsons
    onResult={setResult}
    onLoading={setLoading}
    onError={setError}
  />
) : selectedDisease === "liver" ? (
  <LiverDisease
    onResult={setResult}
    onLoading={setLoading}
    onError={setError}
  />
) : null}


            {loading && (
              <div className="loading-box">
                <div className="loader"></div>

                <div>
                  <strong>Analyzing health data...</strong>
                  <p>
                    Our machine learning model is processing
                    the submitted parameters.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="error">
                ⚠️ {error}
              </div>
            )}

          </div>

          <div className="result-panel">

            <div className="panel-title">
              <span>02</span>
              Prediction Result
            </div>

            {!result && !loading && (
              <div className="empty-result">

                <div className="empty-icon">
                  ✨
                </div>

                <h3>Waiting for prediction</h3>

                <p>
                  Submit the patient information to generate
                  an AI-powered prediction.
                </p>

                <div className="pulse-line"></div>

              </div>
            )}

            <PredictionResult result={result} />

          </div>

        </div>

      </main>

      {/* Disclaimer */}
      <section className="disclaimer">

        <div className="disclaimer-icon">
          ⚕
        </div>

        <div>
          <strong>Important Medical Disclaimer</strong>

          <p>
            This system is intended for educational and
            research purposes only. Predictions are not
            medical diagnoses and should not replace advice
            from qualified healthcare professionals.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer>

        <div className="footer-brand">
          <div className="brand-icon">✚</div>

          <div>
            <strong>MedPredict</strong>
            <span>AI Healthcare Intelligence</span>
          </div>
        </div>

        <p>
          Built with React • FastAPI • Machine Learning
        </p>

      </footer>

    </div>
  );
}

export default App;