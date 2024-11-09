import "@/components/Lab/Lab.css";
import AlgoInfo from "@/components/AlgoInfo/AlgoInfo";
import AlgoGuide from "@/components/AlgoGuide/AlgoGuide";
import AlgoDisplay from "@/components/AlgoDisplay/AlgoDisplay";

interface LabProps {
  algoName: string;
  algoGuideId1: string;
  algoGuideId2?: string;
}

export default function Lab({
  algoName,
  algoGuideId1,
  algoGuideId2,
}: LabProps) {
  return (
    <main id="main-wrapper">
      <div id="grid-container">
        <AlgoInfo algoName={algoName}></AlgoInfo>
        <AlgoGuide
          algoGuideId1={algoGuideId1}
          algoGuideId2={algoGuideId2}
        ></AlgoGuide>
        <AlgoDisplay></AlgoDisplay>
      </div>
    </main>
  );
}
