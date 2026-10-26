import ParkinsonsForm from "../components/ParkinsonsForm";

export default function Parkinsons({
  onResult,
  onLoading,
  onError,
}) {
  return (
    <ParkinsonsForm
      onResult={onResult}
      onLoading={onLoading}
      onError={onError}
    />
  );
}