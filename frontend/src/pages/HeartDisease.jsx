import CardiovascularForm from "../components/CardiovascularForm";

export default function HeartDisease({
  onResult,
  onLoading,
}) {
  return (
    <CardiovascularForm
      onResult={onResult}
      onLoading={onLoading}
    />
  );
}