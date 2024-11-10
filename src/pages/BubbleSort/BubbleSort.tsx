import React, { useCallback, useEffect, useState } from "react";
import "@/components/Lab/Lab.css";
import "@/pages/BubbleSort/BubbleSort.css";

interface Iteration {
  array: number[];
  i: number; // Outer loop index
  j: number; // Inner loop index
  swapped: boolean;
}

export default function BubbleSort() {
  const [array, setArray] = useState<number[]>([]);
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [instructionMessage, setInstructionMessage] =
    useState<string>("Fill your array!");

  const [arrayInputStyle, setArrayInputStyle] = useState<React.CSSProperties>(
    {}
  );
  const [playBtnStyle, setPlayBtnStyle] = useState<React.CSSProperties>({});

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputArray = e.target.value
      .split(",")
      .filter((num) => num.trim() !== "")
      .map(Number)
      .filter((num) => !isNaN(num));
    setArray(inputArray);

    const hasContent = e.target.value.trim() !== "";
    setArrayInputStyle({
      backgroundColor: hasContent ? "var(--color-secondary)" : "white",
      borderColor: hasContent
        ? "var(--color-accent-300)"
        : "var(--color-grey-300)",
      animation: hasContent ? "none" : "colorCycleGrey 1s infinite",
    });
  };

  const checkInput = useCallback(() => {
    if (array.length > 0) {
      setPlayBtnStyle({ animation: "colorCycle 1s infinite" });
    } else {
      setPlayBtnStyle({ animation: "none" });
    }
  }, [array]);

  useEffect(() => {
    checkInput();
  }, [array, checkInput]);

  const bubbleSort = (arr: number[]) => {
    const its: Iteration[] = [];
    const n = arr.length;
    let swapped: boolean;
    const arrayCopy = arr.slice();

    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        its.push({ array: arrayCopy.slice(), i, j, swapped: false });
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap elements
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          swapped = true;
          its.push({ array: arrayCopy.slice(), i, j, swapped: true });
        }
      }
      if (!swapped) break;
    }
    setIterations(its);
  };

  const displayCurrentStep = useCallback(() => {
    if (iterations.length > 0) {
      const { j, swapped } = iterations[currentStep];
      let message;
      if (swapped) {
        message = `Swapped indices ${j} and ${j + 1}`;
      } else {
        message = `Comparing elements at indices ${j} and ${j + 1}`;
      }
      setResultMessage(message);
    }
  }, [currentStep, iterations]);

  useEffect(() => {
    displayCurrentStep();
  }, [currentStep, displayCurrentStep]);

  const handleSort = (e: React.FormEvent) => {
    e.preventDefault();

    if (array.length === 0) {
      setInstructionMessage("Fill your array correctly!");
      return;
    }

    bubbleSort(array);
    setCurrentStep(0);
    setPlayBtnStyle({ animation: "none" });
    setInstructionMessage("See the process below!");
  };

  const handleNextStep = () => {
    if (currentStep < iterations.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main id="main-wrapper">
      <div id="grid-container">
        <section className="item1">
          <div id="overview-content">
            <h1>Bubble Sort</h1>
            <p>Bubble Sort is a simple sorting algorithm...</p>
          </div>
        </section>
        <section className="item2">
          <div id="guide-container">
            <h2 id="guide">GUIDE</h2>
          </div>
          <p id="user-instructions">{instructionMessage}</p>
          <p id="steps">Step {currentStep + 1}</p>
          <p id="outer-loop-info">
            Outer loop i = {iterations[currentStep]?.i}
          </p>
          <p id="inner-loop-info">
            Inner loop j = {iterations[currentStep]?.j}
          </p>
        </section>
        <section className="item3">
          <p id="result">
            [
            {iterations[currentStep]?.array.map((num, idx) => (
              <React.Fragment key={idx}>
                <span
                  className={
                    idx === iterations[currentStep]?.j ||
                    idx === iterations[currentStep]?.j + 1
                      ? "active"
                      : ""
                  }
                >
                  {num}
                </span>
                {idx < iterations[currentStep].array.length - 1 && ", "}
              </React.Fragment>
            ))}
            ]
          </p>
          <p id="status-info">{resultMessage}</p>
        </section>
        <section className="item4">
          <form onSubmit={handleSort}>
            <div id="user-input-array-wrapper">
              <input
                id="user-input-array"
                type="text"
                name="user-input-array"
                placeholder="Enter your array here (e.g. 1,2,3)"
                onChange={handleArrayInputChange}
                style={arrayInputStyle}
              />
            </div>
            <div id="button-wrapper">
              <button type="submit" aria-label="Submit">
                <svg
                  id="play-btn"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                  style={playBtnStyle}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </section>
        <section className="item5">
          <div id="controller-container">
            <h2 id="controller-text">Controller</h2>
          </div>
          <button
            type="button"
            onClick={handlePreviousStep}
            aria-label="Previous"
            id="previous-btn"
            disabled={currentStep === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            aria-label="Next"
            id="next-btn"
            disabled={currentStep === iterations.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
            </svg>
          </button>
        </section>
      </div>
    </main>
  );
}
