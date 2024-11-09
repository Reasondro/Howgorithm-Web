import AlgoInfo from "@/components/AlgoInfo/AlgoInfo";
import "@/components/Lab/Lab.css";

export default function Lab({ algoName }: { algoName: string }) {
  return (
    <main id="main-wrapper">
      <div id="grid-container">
        <AlgoInfo algoName={algoName}></AlgoInfo>
      </div>
    </main>
  );
}
