
import KidneyDiseaseForm from "../components/KidneyDiseaseForm";

export default function KidneyDisease({
  onResult,
  onLoading,
  onError,
}) {
  return (
    <KidneyDiseaseForm
      onResult={onResult}
      onLoading={onLoading}
      onError={onError}
    />
  );
}
