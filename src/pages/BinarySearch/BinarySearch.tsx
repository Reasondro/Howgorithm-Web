import React, { useEffect, useState } from "react";
import "@/components/Lab/Lab.css";
import "./BinarySearch.css";

interface Iteration {
  array: number[];
  l: number;
  r: number;
  mid: number | null;
  comparison: string;
}

const BinarySearch: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [resultMessage, setResultMessage] = useState<string>("");

  const mergeSort = (arr: number[], left: number, right: number) => {
    if (left >= right) return;
    const mid = Math.floor(left + (right - left) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  };

  const merge = (arr: number[], left: number, mid: number, right: number) => {
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);
    let i = 0,
      j = 0,
      k = left;
    while (i < L.length && j < R.length) {
      arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];
    }
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];
  };

  const binarySearch = (arr: number[], target: number) => {
    let l = 0,
      r = arr.length - 1;
    const steps: Iteration[] = [];
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const comparison =
        arr[mid] === target ? "found" : arr[mid] < target ? "less" : "greater";
      steps.push({ array: arr.slice(), l, r, mid, comparison });
      if (arr[mid] === target) {
        setIterations(steps);
        return;
      } else if (arr[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    steps.push({
      array: arr.slice(),
      l,
      r,
      mid: null,
      comparison: "not found",
    });
    setIterations(steps);
  };

  const displayCurrentStep = () => {
    if (iterations.length > 0) {
      const { comparison, mid } = iterations[currentStep];
      let message = "";

      if (comparison === "found") {
        message = `Element found at index ${mid}.`;
      } else if (comparison === "less") {
        message = `Target is greater than ${
          iterations[currentStep]?.array[mid!]
        }. Moving right.`;
      } else if (comparison === "greater") {
        message = `Target is less than ${
          iterations[currentStep]?.array[mid!]
        }. Moving left.`;
      } else if (comparison === "not found") {
        message = "Element not found in the array.";
      }

      setResultMessage(message);
    }
  };

  // UseEffect to call displayCurrentStep whenever currentStep or iterations change
  useEffect(() => {
    displayCurrentStep();
  }, [currentStep, iterations]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const arr = array.slice();
    mergeSort(arr, 0, arr.length - 1);
    binarySearch(arr, target!);
    setCurrentStep(0); // Reset to the first step
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

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputArray = e.target.value
      .split(",")
      .filter((num) => num !== "")
      .map(Number)
      .filter((num) => !isNaN(num));
    setArray(inputArray);
  };

  const handleTargetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    setTarget(isNaN(inputValue) ? null : inputValue);
  };

  return (
    <main id="main-wrapper">
      <div id="grid-container">
        <section className="item1">
          <div id="overview-content">
            <h1>Binary Search</h1>
            <p>
              Binary Search is a quick search algorithm for sorted arrays...
            </p>
          </div>
        </section>
        <section className="item2">
          <div id="guide-container">
            <h2 id="guide">GUIDE</h2>
          </div>
          <p id="user-instructions">Fill the inputs!</p>
          <p id="steps">Step {currentStep + 1}</p>
          <p id="index-info">
            Left: {iterations[currentStep]?.l}, Right:{" "}
            {iterations[currentStep]?.r}, Mid: {iterations[currentStep]?.mid}
          </p>
        </section>
        <section className="item3">
          <p id="result">
            [
            {iterations[currentStep]?.array.map((num, idx) => (
              <span
                key={idx}
                className={
                  (idx === iterations[currentStep]?.mid ? "mid " : "") +
                  (idx >= iterations[currentStep]?.l &&
                  idx <= iterations[currentStep]?.r
                    ? "active-range"
                    : "inactive") +
                  (iterations[currentStep]?.comparison === "found" &&
                  idx === iterations[currentStep]?.mid
                    ? " found"
                    : "")
                }
              >
                {num}
              </span>
            ))}
            ]
          </p>
          <p id="status-info">{resultMessage}</p>
        </section>
        <section className="item4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="user-input-array"
              placeholder="Enter array (e.g. 1,2,3)"
              onChange={handleArrayInputChange}
            />
            <input
              type="text"
              id="user-input-el"
              placeholder="Your element"
              onChange={handleTargetInputChange}
            />
            <button type="submit" aria-label="Submit">
              <svg
                id="play-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </section>
        <section className="item5">
          <button onClick={handlePreviousStep} disabled={currentStep === 0}>
            Previous
          </button>
          <button
            onClick={handleNextStep}
            disabled={currentStep === iterations.length - 1}
          >
            Next
          </button>
        </section>
      </div>
    </main>
  );
};

export default BinarySearch;
