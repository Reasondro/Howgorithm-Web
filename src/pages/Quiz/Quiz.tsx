import { useState, useEffect } from "react";
import "@/pages/Quiz/Quiz.css";

function generateRandomArray(length: number, maxValue: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * maxValue) + 1);
  }
  return arr;
}

// Bubble Sort Step Computation
function computeBubbleSortSteps(array: number[]): {
  array: number[];
  steps: { i: number; j: number; willSwap: boolean }[];
} {
  const arrCopy = [...array];
  const steps: { i: number; j: number; willSwap: boolean }[] = [];
  const n = arrCopy.length;
  let didSwap: boolean;

  for (let i = 0; i < n - 1; i++) {
    didSwap = false;
    for (let j = 0; j < n - i - 1; j++) {
      const willSwap = arrCopy[j] > arrCopy[j + 1];
      steps.push({ i, j, willSwap });
      if (willSwap) {
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
        didSwap = true;
      }
    }
    if (!didSwap) break;
  }
  return { array: arrCopy, steps };
}

// Binary Search Step Computation
function computeBinarySearchSteps(
  array: number[],
  target: number
): {
  array: number[];
  steps: {
    left: number;
    right: number;
    mid: number;
    direction: string;
    found: boolean;
  }[];
} {
  const arrCopy = [...array].sort((a, b) => a - b);
  const steps: {
    left: number;
    right: number;
    mid: number;
    direction: string;
    found: boolean;
  }[] = [];

  let left = 0;
  let right = arrCopy.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arrCopy[mid] === target) {
      steps.push({ left, right, mid, direction: "found", found: true });
      break;
    } else if (arrCopy[mid] < target) {
      steps.push({ left, right, mid, direction: "right", found: false });
      left = mid + 1;
    } else {
      steps.push({ left, right, mid, direction: "left", found: false });
      right = mid - 1;
    }
  }
  return { array: arrCopy, steps };
}

export default function Quiz() {
  const [algorithm, setAlgorithm] = useState<string>("Bubble Sort");
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [quizSteps, setQuizSteps] = useState<
    | { i: number; j: number; willSwap: boolean }[]
    | {
        left: number;
        right: number;
        mid: number;
        direction: string;
        found: boolean;
      }[]
  >([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [attemptMessage, setAttemptMessage] = useState<string>("");
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [displayedArray, setDisplayedArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);

  // Initialize quiz data based on selected algorithm
  useEffect(() => {
    initializeQuiz();
  }, [algorithm]);

  const initializeQuiz = () => {
    const newArr = generateRandomArray(5, 100);

    if (algorithm === "Bubble Sort") {
      const { steps, array } = computeBubbleSortSteps(newArr);
      setInitialArray(newArr);
      setQuizSteps(steps);
      setDisplayedArray(array);
    } else if (algorithm === "Binary Search") {
      // For binary search, we also need a target to search for
      const sortedArr = [...newArr].sort((a, b) => a - b);
      const randomTarget =
        sortedArr[Math.floor(Math.random() * sortedArr.length)];
      setTarget(randomTarget);
      const { steps, array } = computeBinarySearchSteps(
        sortedArr,
        randomTarget
      );
      setInitialArray(sortedArr);
      setQuizSteps(steps);
      setDisplayedArray(array);
    }

    setCurrentStepIndex(0);
    setUserScore(0);
    setAttemptMessage("");
    setIsQuizComplete(false);
  };

  const currentStep = quizSteps[currentStepIndex];

  const handleUserGuess = (userInput: string | boolean) => {
    if (!currentStep) return;

    if (algorithm === "Bubble Sort") {
      const step = currentStep as { i: number; j: number; willSwap: boolean };
      const correctAnswer = step.willSwap ? "swap" : "dontSwap";

      if (userInput === correctAnswer) {
        setUserScore(userScore + 1);
        setAttemptMessage("✅ Correct!");
        if (step.willSwap) {
          // Update the displayed array for bubble sort
          const updatedArray = [...displayedArray];
          const temp = updatedArray[step.j];
          updatedArray[step.j] = updatedArray[step.j + 1];
          updatedArray[step.j + 1] = temp;
          setDisplayedArray(updatedArray);
        }
        proceedToNextStep();
      } else {
        setAttemptMessage("❌ Incorrect. Try again!");
      }
    } else if (algorithm === "Binary Search") {
      const step = currentStep as {
        left: number;
        right: number;
        mid: number;
        direction: string;
        found: boolean;
      };
      if (step.found && userInput === "found") {
        setUserScore(userScore + 1);
        setAttemptMessage("✅ Correct! The target was found.");
        proceedToNextStep();
      } else if (!step.found && userInput === step.direction) {
        setUserScore(userScore + 1);
        setAttemptMessage("✅ Correct!");
        proceedToNextStep();
      } else {
        setAttemptMessage("❌ Incorrect. Try again!");
      }
    }
  };

  const proceedToNextStep = () => {
    if (currentStepIndex < quizSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setAttemptMessage("");
    } else {
      // Quiz is complete
      setIsQuizComplete(true);
      setAttemptMessage("");
    }
  };

  const handleRestartQuiz = () => {
    initializeQuiz();
  };

  return (
    <main id="main-wrapper">
      <div className="quiz-container">
        <section className="quiz-header">
          <h1>{algorithm} Quiz</h1>
          <p>
            Test your understanding of {algorithm.toLowerCase()} by going
            through the steps yourself!
          </p>
          <label className="algorithm-select">
            <span>Select Algorithm: </span>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="Bubble Sort">Bubble Sort</option>
              <option value="Binary Search">Binary Search</option>
            </select>
          </label>
        </section>

        {isQuizComplete ? (
          <section className="quiz-results">
            <h2>Quiz Complete!</h2>
            <p>
              You scored {userScore} out of {quizSteps.length} steps correctly
              for the {algorithm} quiz.
            </p>
            <button onClick={handleRestartQuiz} className="restart-button">
              Restart Quiz
            </button>
            {/* TODO: Integrate this final score with your Supabase database here */}
          </section>
        ) : (
          <section className="quiz-content">
            {algorithm === "Bubble Sort" && (
              <>
                <div className="array-display">
                  {displayedArray.map((value, index) => (
                    <span
                      key={index}
                      className={`array-element ${
                        currentStep &&
                        (index === (currentStep as any).j ||
                          index === (currentStep as any).j + 1)
                          ? "highlight"
                          : ""
                      }`}
                    >
                      {value}
                    </span>
                  ))}
                </div>
                {currentStep && (
                  <>
                    <p className="quiz-instructions">
                      Current Step: Compare elements at positions{" "}
                      <strong>{(currentStep as any).j}</strong> and{" "}
                      <strong>{(currentStep as any).j + 1}</strong>.
                    </p>
                    <p>Should we swap these two elements?</p>
                    <div className="buttons-container">
                      <button onClick={() => handleUserGuess("swap")}>
                        Swap
                      </button>
                      <button onClick={() => handleUserGuess("dontSwap")}>
                        Don't Swap
                      </button>
                    </div>
                    {attemptMessage && (
                      <p className="attempt-message">{attemptMessage}</p>
                    )}
                    <p className="progress-info">
                      Step {currentStepIndex + 1} of {quizSteps.length}
                    </p>
                  </>
                )}
              </>
            )}

            {algorithm === "Binary Search" && currentStep && (
              <>
                <div className="array-display">
                  {(currentStep as any).direction !== "found" ? (
                    <>
                      {displayedArray.map((value, index) => {
                        if (
                          index >= (currentStep as any).left &&
                          index <= (currentStep as any).right
                        ) {
                          return (
                            <span
                              key={index}
                              className={`array-element ${
                                index === (currentStep as any).mid
                                  ? "highlight"
                                  : ""
                              }`}
                            >
                              {value}
                            </span>
                          );
                        } else {
                          return (
                            <span
                              key={index}
                              className="array-element hidden-element"
                            >
                              {value}
                            </span>
                          );
                        }
                      })}
                    </>
                  ) : (
                    displayedArray.map((value, index) => (
                      <span
                        key={index}
                        className={`array-element ${
                          index === (currentStep as any).mid ? "highlight" : ""
                        }`}
                      >
                        {value}
                      </span>
                    ))
                  )}
                </div>
                <p className="quiz-instructions">
                  We are searching for the target value:{" "}
                  <strong>{target}</strong>
                </p>
                {(currentStep as any).found ? (
                  <p>
                    The value at position {(currentStep as any).mid} matches the
                    target. What happens next?
                  </p>
                ) : (
                  <p>
                    Compare target with the middle element at position{" "}
                    <strong>{(currentStep as any).mid}</strong> which is{" "}
                    <strong>{displayedArray[(currentStep as any).mid]}</strong>.
                    Should we go left or right?
                  </p>
                )}
                <div className="buttons-container">
                  {(currentStep as any).found ? (
                    <button onClick={() => handleUserGuess("found")}>
                      Found Target
                    </button>
                  ) : (
                    <>
                      <button onClick={() => handleUserGuess("left")}>
                        Search Left Half
                      </button>
                      <button onClick={() => handleUserGuess("right")}>
                        Search Right Half
                      </button>
                    </>
                  )}
                </div>
                {attemptMessage && (
                  <p className="attempt-message">{attemptMessage}</p>
                )}
                <p className="progress-info">
                  Step {currentStepIndex + 1} of {quizSteps.length}
                </p>
              </>
            )}

            {!currentStep && !isQuizComplete && (
              <p>Loading next step of the quiz...</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
