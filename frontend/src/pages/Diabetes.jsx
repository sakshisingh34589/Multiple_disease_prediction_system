import PredictionForm from "../components/PredictionForm";

export default function Diabetes({
  onResult,
  onLoading,
  onError,
}) {
  return (
    <PredictionForm
      onResult={onResult}
      onLoading={onLoading}
      onError={onError}
    />
  );
}