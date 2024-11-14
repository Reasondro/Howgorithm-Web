import { useState, useEffect } from "react";
import "@/pages/Quiz/BubbleSortQuiz.css";

function generateRandomArray(length: number, maxValue: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * maxValue) + 1);
  }
  return arr;
}

// Precompute the bubble sort steps (comparisons) for the given array
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

export default function BubbleSortQuiz() {
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [quizSteps, setQuizSteps] = useState<
    { i: number; j: number; willSwap: boolean }[]
  >([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [attemptMessage, setAttemptMessage] = useState<string>("");
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [displayedArray, setDisplayedArray] = useState<number[]>([]);

  useEffect(() => {
    // Generate a random array when component mounts
    const newArr = generateRandomArray(5, 100);
    setInitialArray(newArr);
    const { steps } = computeBubbleSortSteps(newArr);
    setQuizSteps(steps);
    setDisplayedArray(newArr);
  }, []);

  const currentStep = quizSteps[currentStepIndex];

  const handleUserGuess = (userThinksSwap: boolean) => {
    if (!currentStep) return;

    if (userThinksSwap === currentStep.willSwap) {
      // User guessed correctly
      setUserScore(userScore + 1);
      setAttemptMessage("✅ Correct!");
      // If a swap is needed, update the displayed array
      if (currentStep.willSwap) {
        const updatedArray = [...displayedArray];
        const temp = updatedArray[currentStep.j];
        updatedArray[currentStep.j] = updatedArray[currentStep.j + 1];
        updatedArray[currentStep.j + 1] = temp;
        setDisplayedArray(updatedArray);
      }
    } else {
      setAttemptMessage("❌ Incorrect. Try again!");
      return; // Don't move to the next step if the answer is wrong
    }

    // Move to the next step
    if (currentStepIndex < quizSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Quiz is complete
      setIsQuizComplete(true);
      setAttemptMessage("");
    }
  };

  const handleRestartQuiz = () => {
    const newArr = generateRandomArray(5, 100);
    setInitialArray(newArr);
    const { steps } = computeBubbleSortSteps(newArr);
    setQuizSteps(steps);
    setDisplayedArray(newArr);
    setCurrentStepIndex(0);
    setUserScore(0);
    setIsQuizComplete(false);
    setAttemptMessage("");
  };

  return (
    <main id="main-wrapper">
      <div className="quiz-container">
        <section className="quiz-header">
          <h1>Bubble Sort Interactive Quiz</h1>
          <p>
            Let's test your understanding of bubble sort by simulating the steps
            yourself!
          </p>
        </section>

        {isQuizComplete ? (
          <section className="quiz-results">
            <h2>Quiz Complete!</h2>
            <p>
              You scored {userScore} out of {quizSteps.length} steps correctly.
            </p>
            <button onClick={handleRestartQuiz} className="restart-button">
              Restart Quiz
            </button>
            {/* TODO: You can integrate this final score with your Supabase database here */}
          </section>
        ) : (
          <section className="quiz-content">
            <div className="array-display">
              {displayedArray.map((value, index) => (
                <span
                  key={index}
                  className={`array-element ${
                    currentStep &&
                    (index === currentStep.j || index === currentStep.j + 1)
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
                  <strong>{currentStep.j}</strong> and{" "}
                  <strong>{currentStep.j + 1}</strong>.
                </p>
                <p>Should we swap these two elements?</p>
                <div className="buttons-container">
                  <button onClick={() => handleUserGuess(true)}>Swap</button>
                  <button onClick={() => handleUserGuess(false)}>
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

            {!currentStep && !isQuizComplete && (
              <p>Loading next step of the quiz...</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
