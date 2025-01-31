import React, { useCallback, useEffect, useState } from "react";
import "@/components/Lab/Lab.css";
import "@/pages/BinarySearch/BinarySearch.css";

interface Iteration {
  array: number[];
  l: number;
  r: number;
  mid: number | null;
  comparison: string;
}

export default function BinarySearch() {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [instructionMessage, setInstructionMessage] =
    useState<string>("Fill the inputs!");

  const [arrayInputStyle, setArrayInputStyle] = useState<React.CSSProperties>(
    {}
  );
  const [targetInputStyle, setTargetInputStyle] = useState<React.CSSProperties>(
    {}
  );
  const [playBtnStyle, setPlayBtnStyle] = useState<React.CSSProperties>({});

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputArray = e.target.value
      .split(",")
      .filter((num) => num !== "")
      .map(Number)
      .filter((num) => !isNaN(num));
    setArray(inputArray);
    handleInputChange("array", e.target.value);
  };

  const handleTargetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    const numValue = Number(inputValue);

    if (inputValue === "" || isNaN(numValue)) {
      setTarget(null);
    } else {
      setTarget(Number(numValue));
    }

    handleInputChange("target", e.target.value);
  };

  const handleInputChange = (inputType: string, value: string) => {
    const hasContent: boolean = value.trim() !== "";

    if (inputType === "array") {
      setArrayInputStyle({
        backgroundColor: hasContent ? "var(--color-secondary)" : "white",
        borderColor: hasContent
          ? "var(--color-accent-300)"
          : "var(--color-grey-300)",
        animation: hasContent ? "none" : "colorCycleGrey 1s infinite",
      });
    }

    if (inputType === "target") {
      setTargetInputStyle({
        backgroundColor: hasContent ? "var(--color-secondary)" : "white",
        borderColor: hasContent
          ? "var(--color-accent-300)"
          : "var(--color-grey-300)",
        animation: hasContent ? "none" : "colorCycleGrey 1s infinite",
      });
    }
  };

  const checkBothInputs = useCallback(() => {
    if (array.length > 0 && target !== null) {
      setPlayBtnStyle({ animation: "colorCycle 1s infinite" });
    } else {
      setPlayBtnStyle({ animation: "none" });
    }
  }, [array, target]);

  useEffect(() => {
    checkBothInputs();
  }, [array, target, checkBothInputs]);

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
    const its: Iteration[] = []; //? iteration local buat nanti di set ke yg punya komponen
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const comparison =
        arr[mid] === target ? "found" : arr[mid] < target ? "less" : "greater";

      its.push({ array: arr.slice(), l, r, mid, comparison }); //? logic nge push si iterasiny

      if (arr[mid] === target) {
        setIterations(its);
        return;
      } else if (arr[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    its.push({
      array: arr.slice(),
      l,
      r,
      mid: null,
      comparison: "not found",
    }); //? logic nge push si iterasiny
    setIterations(its);
  };

  const displayCurrentStep = useCallback(() => {
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
  }, [currentStep, iterations]);

  useEffect(() => {
    displayCurrentStep();
  }, [currentStep, iterations, displayCurrentStep]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (array.length == 0 || target === null) {
      setInstructionMessage("Fill the inputs correctly!");
      return;
    }

    mergeSort(array, 0, array.length - 1);
    binarySearch(array, target!);
    setCurrentStep(0);
    setPlayBtnStyle({ animation: "none" });

    setInstructionMessage("See the process below!");
  };

  const handleNextStep = () => {
    if (currentStep < iterations.length - 1) {
      setInstructionMessage("See the process below!");
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setInstructionMessage("See the process below!");
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main id="main-wrapper">
      <div id="grid-container">
        <section className="item1">
          <div id="overview-content">
            <h1>Binary Search</h1>
            <p>
              Binary Search is a fast search algorithm that efficiently locates
              the position of a target value within a sorted array or list. It
              works by repeatedly dividing the search interval in half, hence
              the name "binary." The algorithm starts by comparing the target
              value to the middle element of the array:
            </p>
            <ul>
              <li>• Start by locating the middle position of the array.</li>
              <li>
                • If the target value matches the middle element, its position
                is returned.
              </li>
              <li>
                • If the target value is less than the middle element, the
                search continues on the lower half of the array.
              </li>
              <li>
                • If the target value is greater, the search continues on the
                upper half.
              </li>
            </ul>
            <p>
              This process continues recursively or iteratively until the target
              value is found or the search interval is empty, indicating that
              the target value is not in the array. Binary Search has a time
              complexity of O(log n), making it much more efficient than a
              linear search for large, sorted datasets.
            </p>
          </div>
        </section>
        <section className="item2">
          <div id="guide-container">
            <h2 id="guide">GUIDE</h2>
          </div>
          <p id="user-instructions">{instructionMessage}</p>
          <p id="steps">Step {currentStep + 1}</p>
          <p id="index-info">
            Left: [{iterations[currentStep]?.l}], Mid: [
            {iterations[currentStep]?.mid}], Right: [
            {iterations[currentStep]?.r}]
          </p>
        </section>
        <section className="item3">
          <p id="result">
            [
            {iterations[currentStep]?.array.map((num, idx) => (
              <React.Fragment key={idx}>
                <span
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
                {idx < iterations[currentStep].array.length - 1 && ", "}
              </React.Fragment>
            ))}
            ]
          </p>
          <p id="status-info">{resultMessage}</p>
        </section>
        <section className="item4">
          <form onSubmit={handleSearch} className="binarySearchForm">
            <input
              type="text"
              id="user-input-array"
              placeholder="Enter array (e.g. 1,2,3)"
              onChange={handleArrayInputChange}
              style={arrayInputStyle}
            />
            <input
              type="text"
              id="user-input-el"
              placeholder="Your element"
              onChange={handleTargetInputChange}
              style={targetInputStyle}
            />
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
            disabled={currentStep === 0}
            aria-label="Previous"
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
            disabled={currentStep === iterations.length - 1}
            aria-label="Next"
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

// export default BinarySearch;
