import "@/components/Lab/Lab.css";

import React, { useState, useEffect, FormEvent } from "react";
import "./BinarySearch.css";

interface BinarySearchStep {
  array: number[];
  l: number;
  r: number;
  mid: number | null;
  comparison: "found" | "less" | "greater" | "not found";
}

export default function BinarySearch() {
  // State variables
  const [arrayInput, setArrayInput] = useState<string>("");
  const [element, setElement] = useState<string>("");
  const [iterations, setIterations] = useState<BinarySearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [statusInfo, setStatusInfo] = useState<string>("");
  const [displayArray, setDisplayArray] = useState<string>("");

  // Effect to reset when inputs change
  useEffect(() => {
    if (arrayInput === "" || element === "") {
      setIterations([]);
      setCurrentStep(0);
      // setResult("");
      // setStatusInfo("");
      // setDisplayArray("");
    }
  }, [arrayInput, element]);

  // Utility: Merge Sort
  const merge = (arr: number[], left: number, mid: number, right: number) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L: number[] = [];
    const R: number[] = [];

    for (let i = 0; i < n1; i++) L.push(arr[left + i]);
    for (let j = 0; j < n2; j++) R.push(arr[mid + 1 + j]);

    let i = 0,
      j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k++] = L[i++];
      } else {
        arr[k++] = R[j++];
      }
    }

    while (i < n1) {
      arr[k++] = L[i++];
    }

    while (j < n2) {
      arr[k++] = R[j++];
    }
  };

  const mergeSort = (arr: number[], left: number, right: number) => {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  };

  // Utility: Binary Search with step recording
  const performBinarySearch = (
    arr: number[],
    target: number
  ): BinarySearchStep[] => {
    let l = 0;
    let r = arr.length - 1;
    const steps: BinarySearchStep[] = [];

    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const comparison =
        arr[mid] === target ? "found" : arr[mid] < target ? "less" : "greater";

      steps.push({
        array: [...arr],
        l,
        r,
        mid,
        comparison,
      });

      if (arr[mid] === target) {
        break;
      } else if (arr[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    if (l > r) {
      steps.push({
        array: [...arr],
        l,
        r,
        mid: null,
        comparison: "not found",
      });
    }

    return steps;
  };

  // Handler: Form Submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate and parse inputs
    const arrNum = parseArrayInput(arrayInput);
    const target = parseElementInput(element);

    if (arrNum.length === 0 || target === null) {
      // Reset display if inputs are invalid
      resetDisplay();
      return;
    }

    // Sort the array
    const sortedArr = [...arrNum];
    mergeSort(sortedArr, 0, sortedArr.length - 1);

    // Perform Binary Search
    const searchSteps = performBinarySearch(sortedArr, target);
    setIterations(searchSteps);
    setCurrentStep(0);

    // Display initial step
    if (searchSteps.length > 0) {
      displayCurrentStep(searchSteps, 0);
      setDisplayArray(
        generateArrayDisplay(
          searchSteps[0].array,
          searchSteps[0].mid,
          searchSteps[0].l,
          searchSteps[0].r
        )
      );
    }
  };

  // Utility: Parse Array Input
  const parseArrayInput = (input: string): number[] => {
    return input
      .split(",")
      .filter((num) => num !== "")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));
  };

  // Utility: Parse Element Input
  const parseElementInput = (input: string): number | null => {
    const el = Number(input.trim());
    if (input.trim() === "" || isNaN(el)) {
      return null;
    }
    return el;
  };

  // Utility: Reset Display
  const resetDisplay = () => {
    setIterations([]);
    setCurrentStep(0);
    setResult("");
    setStatusInfo("");
    setDisplayArray("");
  };

  // Utility: Generate Array Display with Highlights (as HTML string)
  const generateArrayDisplay = (
    array: number[],
    mid: number | null,
    l: number,
    r: number
  ): string => {
    return array
      .map((num, index) => {
        const classes = [];

        if (mid !== null && index === mid) {
          classes.push("mid");
        }
        if (index >= l && index <= r) {
          classes.push("active-range");
        } else {
          classes.push("inactive");
        }
        if (
          mid !== null &&
          index === mid &&
          iterations[currentStep]?.comparison === "found"
        ) {
          classes.push("found");
        }

        return `<span class="${classes.join(" ")}">${num}</span>`;
      })
      .join(", ");
  };

  // Handler: Display Current Step
  const displayCurrentStep = (steps: BinarySearchStep[], step: number) => {
    const { array, l, r, mid, comparison } = steps[step];

    // Update display array with highlights
    setDisplayArray(generateArrayDisplay(array, mid, l, r));

    // Update result and status messages
    if (comparison === "found") {
      setResult(`Element found at index ${mid}.`);
      setStatusInfo(`Finished with ${step + 1} steps!`);
    } else if (comparison === "less") {
      setResult(`Target is greater than ${array[mid!]}. Moving right.`);
    } else if (comparison === "greater") {
      setResult(`Target is less than ${array[mid!]}]. Moving left.`);
    } else if (comparison === "not found") {
      setResult(`Element not found in the array.`);
      setStatusInfo(`Finished computing.`);
    }
  };

  // Handler: Previous Step
  const handlePrevious = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      displayCurrentStep(iterations, newStep);
      console.log(result);
    }
  };

  // Handler: Next Step
  const handleNext = () => {
    if (currentStep < iterations.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      displayCurrentStep(iterations, newStep);
      console.log(result);
    }
  };

  // Handlers: Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "user-input-array") {
      setArrayInput(value);
    } else if (id === "user-input-el") {
      setElement(value);
    }

    // Style manipulation based on input value
    if (value.trim() !== "") {
      e.target.style.animation = "none";
      e.target.style.backgroundColor = "var(--color-secondary)";
      e.target.style.borderColor = "var(--color-accent-300)";
    } else {
      e.target.style.borderColor = "var(--color-grey-300)";
      e.target.style.animation = "colorCycleGrey 1s infinite";
    }

    // Check if both inputs are filled to animate the play button
    if (
      arrayInput.trim() !== "" &&
      element.trim() !== "" &&
      id === "user-input-array"
    ) {
      const playBtn = document.getElementById("play-btn") as HTMLButtonElement;
      playBtn.style.animation = "colorCycle 1s infinite";
    } else if (
      (arrayInput.trim() === "" || element.trim() === "") &&
      id === "user-input-el"
    ) {
      const playBtn = document.getElementById("play-btn") as HTMLButtonElement;
      playBtn.style.animation = "none";
    }
  };

  return (
    <main id="main-wrapper">
      <div id="grid-container">
        {/* Overview Section */}
        <section className="item1">
          <div id="overview-content">
            <h1>Binary Search</h1>
            <p>
              Binary Search adalah algoritma pencarian cepat pada array yang
              sudah terurut. Algoritma ini membandingkan elemen tengah dengan
              target. Jika tidak cocok, algoritma mengabaikan setengah array
              yang tidak mungkin mengandung target dan mengulangi proses pada
              setengah yang lain hingga target ditemukan atau tidak ada lagi
              elemen yang tersisa.
            </p>
          </div>
        </section>

        {/* Guide Section */}
        <section className="item2">
          <div id="guide-container">
            <h2 id="guide">GUIDE</h2>
          </div>
          <p id="user-instructions">Fill the inputs!</p>
          <p id="steps">{`Step ${currentStep + 1}`}</p>
          <p id="index-info">{/* Dynamic content based on current step */}</p>
        </section>

        {/* Result Section */}
        <section className="item3">
          {/* Display the array with highlights */}
          <div
            id="result"
            dangerouslySetInnerHTML={{ __html: displayArray }}
          ></div>
          <p id="status-info">{statusInfo}</p>
        </section>

        {/* Input Form Section */}
        <section className="item4">
          <form onSubmit={handleSubmit}>
            <div id="user-input-array-wrapper">
              <label htmlFor="user-input-array"></label>
              <input
                id="user-input-array"
                type="text"
                name="user-input-array"
                placeholder="Enter your array here (e.g. 1,2,3)"
                value={arrayInput}
                onChange={handleInputChange}
                required
              />
            </div>
            <div id="user-input-el-wrapper">
              <label htmlFor="user-input-el"></label>
              <input
                id="user-input-el"
                type="text"
                name="user-input-el"
                placeholder="Your element"
                value={element}
                onChange={handleInputChange}
                required
              />
            </div>
            <div id="button-wrapper">
              <button
                type="submit"
                aria-label="Submit"
                className="submit-button"
              >
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
            </div>
          </form>
        </section>

        {/* Controller Section */}
        <section className="item5">
          <div id="controller-container">
            <h2 id="controller-text">Controller</h2>
          </div>
          <button
            type="button"
            aria-label="Previous"
            id="previous-btn"
            onClick={handlePrevious}
            disabled={currentStep === 0 || iterations.length === 0}
            className="controller-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.712 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            id="next-btn"
            onClick={handleNext}
            disabled={
              currentStep >= iterations.length - 1 || iterations.length === 0
            }
            className="controller-button"
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
