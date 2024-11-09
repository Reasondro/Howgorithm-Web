interface algoGuideProps {
  algoGuideId1: string;
  algoGuideId2?: string;
}

export default function AlgoGuide({
  algoGuideId1,
  algoGuideId2,
}: algoGuideProps) {
  return (
    <section className="item2">
      <div id="guide-container">
        <h2 id="guide">GUIDE</h2>
      </div>
      <p id="user-instructions">Fill your array!</p>
      <p id="steps"></p>
      <p id={algoGuideId1}></p>
      {algoGuideId2 && <p id={algoGuideId2}></p>}
    </section>
  );
}
