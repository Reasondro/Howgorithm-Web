interface algoInfoProps {
  algoName: string;
}

export default function AlgoInfo({ algoName }: algoInfoProps) {
  return (
    <section className="item1">
      <div id="overview-content">
        <h1>{algoName}</h1>
        <p>something</p>
      </div>
    </section>
  );
}
