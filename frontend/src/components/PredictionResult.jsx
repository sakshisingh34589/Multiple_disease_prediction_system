function PredictionResult({ result }) {
  if (!result) {
    return null;
  }

  const isPositive = result.prediction === 1;
  const probability = result.probability * 100;

  return (
    <div
      className={`result-card ${
        isPositive ? "result-risk" : "result-safe"
      }`}
    >

      <div className="result-status-icon">
        {isPositive ? "⚠️" : "✓"}
      </div>

      <div className="result-content">

        <span className="result-label">
          AI PREDICTION
        </span>

        <h2>
          {isPositive
            ? "Potential Risk Detected"
            : "Low Risk Detected"}
        </h2>

       <p className="result-message">
  {typeof result.message === "string"
    ? result.message
    : result.message
      ? JSON.stringify(result.message)
      : "Prediction completed."}
</p>

        <div className="probability-section">

          <div className="probability-header">
            <span>Prediction Probability</span>

            <strong>
              {probability.toFixed(2)}%
            </strong>
          </div>

          <div className="probability-bar">
            <div
              className="probability-fill"
              style={{
                width: `${probability}%`,
              }}
            ></div>
          </div>

        </div>

        <div className="result-meta">

          <div>
            <span>Disease</span>
            <strong>{result.disease}</strong>
          </div>

          <div>
            <span>Model Output</span>
            <strong>{result.prediction}</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default PredictionResult;