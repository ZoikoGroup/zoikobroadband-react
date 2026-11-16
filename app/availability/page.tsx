import JourneyProvider from "../Components/journey/JourneyProvider";
import JourneyShell from "../Components/journey/JourneyShell";

export default function JourneyPage() {
  return (
    <JourneyProvider>
      <JourneyShell />
    </JourneyProvider>
  );
}
