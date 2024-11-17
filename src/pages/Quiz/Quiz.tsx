import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Session } from "@supabase/supabase-js";
import "@/pages/Quiz/Quiz.css";

function generateRandomArray(length: number, maxValue: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * maxValue) + 1);
  }
  return arr;
}

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

export default function Quiz({ session }: { session: Session | null }) {
  const user = session?.user;

  const [, setBubbleInitialArray] = useState<number[]>([]);
  const [bubbleQuizSteps, setBubbleQuizSteps] = useState<
    { i: number; j: number; willSwap: boolean }[]
  >([]);
  const [bubbleCurrentStepIndex, setBubbleCurrentStepIndex] =
    useState<number>(0);
  const [bubbleUserScore, setBubbleUserScore] = useState<number>(0);
  const [bubbleAttemptMessage, setBubbleAttemptMessage] = useState<string>("");
  const [bubbleIsQuizComplete, setBubbleIsQuizComplete] =
    useState<boolean>(false);
  const [bubbleDisplayedArray, setBubbleDisplayedArray] = useState<number[]>(
    []
  );
  const [bubbleStepAttempted, setBubbleStepAttempted] = useState<boolean[]>([]);

  const [, setBinaryInitialArray] = useState<number[]>([]);
  const [binaryQuizSteps, setBinaryQuizSteps] = useState<
    {
      left: number;
      right: number;
      mid: number;
      direction: string;
      found: boolean;
    }[]
  >([]);
  const [binaryCurrentStepIndex, setBinaryCurrentStepIndex] =
    useState<number>(0);
  const [binaryUserScore, setBinaryUserScore] = useState<number>(0);
  const [binaryAttemptMessage, setBinaryAttemptMessage] = useState<string>("");
  const [binaryIsQuizComplete, setBinaryIsQuizComplete] =
    useState<boolean>(false);
  const [binaryDisplayedArray, setBinaryDisplayedArray] = useState<number[]>(
    []
  );
  const [binaryTarget, setBinaryTarget] = useState<number | null>(null);
  const [binaryStepAttempted, setBinaryStepAttempted] = useState<boolean[]>([]);

  useEffect(() => {
    initializeBubbleSortQuiz();
    initializeBinarySearchQuiz();
  }, []);

  const initializeBubbleSortQuiz = () => {
    const newArr = generateRandomArray(6, 100);
    const { steps } = computeBubbleSortSteps(newArr);
    setBubbleInitialArray(newArr);
    setBubbleQuizSteps(steps);
    setBubbleDisplayedArray([...newArr]);
    setBubbleCurrentStepIndex(0);
    setBubbleUserScore(0);
    setBubbleAttemptMessage("");
    setBubbleIsQuizComplete(false);
    setBubbleStepAttempted(Array(steps.length).fill(false));
  };

  const initializeBinarySearchQuiz = () => {
    const newArr = generateRandomArray(11, 100);
    const sortedArr = [...newArr].sort((a, b) => a - b);
    const randomTarget =
      sortedArr[Math.floor(Math.random() * sortedArr.length)];
    setBinaryTarget(randomTarget);
    const { steps } = computeBinarySearchSteps(sortedArr, randomTarget);
    setBinaryInitialArray(sortedArr);
    setBinaryQuizSteps(steps);
    setBinaryDisplayedArray(sortedArr);
    setBinaryCurrentStepIndex(0);
    setBinaryUserScore(0);
    setBinaryAttemptMessage("");
    setBinaryIsQuizComplete(false);
    setBinaryStepAttempted(Array(steps.length).fill(false));
  };

  const handleBubbleUserGuess = (userInput: "swap" | "dontSwap") => {
    if (bubbleIsQuizComplete || !bubbleQuizSteps[bubbleCurrentStepIndex])
      return;

    const currentStep = bubbleQuizSteps[bubbleCurrentStepIndex];
    const correctAnswer = currentStep.willSwap ? "swap" : "dontSwap";

    if (userInput === correctAnswer) {
      //? check if userstep attempted
      if (!bubbleStepAttempted[bubbleCurrentStepIndex]) {
        //?  first attempt for this step and it's correct
        setBubbleUserScore((prevScore) => prevScore + 1);
      }
      setBubbleAttemptMessage("✅ Correct!");
      if (currentStep.willSwap) {
        //? updatee ddipsaly array
        const updatedArray = [...bubbleDisplayedArray];
        const temp = updatedArray[currentStep.j];
        updatedArray[currentStep.j] = updatedArray[currentStep.j + 1];
        updatedArray[currentStep.j + 1] = temp;
        setBubbleDisplayedArray(updatedArray);
      }
      //? marrk  step as attempted
      const updatedStepAttempted = [...bubbleStepAttempted];
      updatedStepAttempted[bubbleCurrentStepIndex] = true;
      setBubbleStepAttempted(updatedStepAttempted);

      proceedToNextBubbleStep();
    } else {
      //? user is incorrect on the first attempt of the step,thne alos mark it as attempted
      if (!bubbleStepAttempted[bubbleCurrentStepIndex]) {
        const updatedStepAttempted = [...bubbleStepAttempted];
        updatedStepAttempted[bubbleCurrentStepIndex] = true;
        setBubbleStepAttempted(updatedStepAttempted);
      }
      setBubbleAttemptMessage("❌ Incorrect. Try again!");
    }
  };

  const proceedToNextBubbleStep = async () => {
    if (bubbleCurrentStepIndex < bubbleQuizSteps.length - 1) {
      setBubbleCurrentStepIndex(bubbleCurrentStepIndex + 1);
      setBubbleAttemptMessage("");
    } else {
      //? bubble Sort Quiz is complete
      setBubbleIsQuizComplete(true);
      setBubbleAttemptMessage("");

      //? bubble sort quiz final score with supabase database
      if (user) {
        //? sstep 1: fetch current bubble_score and total_score from progress table
        const { data: currentProgress, error: fetchError } = await supabase
          .from("progress")
          .select("bubble_score, total_score")
          .eq("id", user.id)
          .single();

        if (fetchError) {
          console.error("Error fetching current bubble score:", fetchError);
        } else if (currentProgress) {
          //? stpe 2: clacultae new scores --> adding  bubbleUserScore to the current scores
          const newBubbleScore =
            (currentProgress.bubble_score || 0) + bubbleUserScore;
          const newTotalScore =
            (currentProgress.total_score || 0) + bubbleUserScore;

          //? step 3: updatee  progress table with  new scores
          const { data: updateData, error: updateError } = await supabase
            .from("progress")
            .update({
              bubble_score: newBubbleScore,
              total_score: newTotalScore,
            })
            .eq("id", user.id);

          if (updateError) {
            console.error("Error updating bubble score:", updateError);
          } else {
            console.log("Bubble scores updated successfully:", updateData);
          }
        }
      }
    }
  };

  const handleBinaryUserGuess = (userInput: "left" | "right" | "found") => {
    if (binaryIsQuizComplete || !binaryQuizSteps[binaryCurrentStepIndex])
      return;

    const currentStep = binaryQuizSteps[binaryCurrentStepIndex];
    let correct = false;

    if (currentStep.found && userInput === "found") {
      correct = true;
    } else if (!currentStep.found && userInput === currentStep.direction) {
      correct = true;
    }

    if (correct) {
      //? if this  first attempt for thie step and  correct --> increment score
      if (!binaryStepAttempted[binaryCurrentStepIndex]) {
        setBinaryUserScore((prevScore) => prevScore + 1);
      }
      setBinaryAttemptMessage("✅ Correct!");
      //? mark the steap as   attempted
      const updatedStepAttempted = [...binaryStepAttempted];
      updatedStepAttempted[binaryCurrentStepIndex] = true;
      setBinaryStepAttempted(updatedStepAttempted);

      proceedToNextBinaryStep();
    } else {
      //? if user is incorrec t  first attempt of this step --> mark  as attempted
      if (!binaryStepAttempted[binaryCurrentStepIndex]) {
        const updatedStepAttempted = [...binaryStepAttempted];
        updatedStepAttempted[binaryCurrentStepIndex] = true;
        setBinaryStepAttempted(updatedStepAttempted);
      }
      setBinaryAttemptMessage("❌ Incorrect. Try again!");
    }
  };

  const proceedToNextBinaryStep = async () => {
    if (binaryCurrentStepIndex < binaryQuizSteps.length - 1) {
      setBinaryCurrentStepIndex(binaryCurrentStepIndex + 1);
      setBinaryAttemptMessage("");
    } else {
      //? binary search Quiz is complete
      setBinaryIsQuizComplete(true);
      setBinaryAttemptMessage("");

      //? intergrate binary search quiz final score with Supabase
      if (user) {
        //? step 1 : fetch  current binary_score and total_score from the progress table (dari supabsae)
        const { data: currentProgress, error: fetchError } = await supabase
          .from("progress")
          .select("binary_score, total_score")
          .eq("id", user.id)
          .single();

        if (fetchError) {
          console.error("Error fetching current binary score:", fetchError);
        } else if (currentProgress) {
          //? step 2: calculate the new scores --> adding the binaryUserScore to the current scores
          const newBinaryScore =
            (currentProgress.binary_score || 0) + binaryUserScore;
          const newTotalScore =
            (currentProgress.total_score || 0) + binaryUserScore;

          //? step 3: update the progress table with the new scores
          const { data: updateData, error: updateError } = await supabase
            .from("progress")
            .update({
              binary_score: newBinaryScore,
              total_score: newTotalScore,
            })
            .eq("id", user.id);

          if (updateError) {
            console.error("Error updating binary score:", updateError);
          } else {
            console.log("Binary scores updated successfully:", updateData);
          }
        }
      }
    }
  };

  const handleRestartBubbleQuiz = () => {
    initializeBubbleSortQuiz();
  };

  const handleRestartBinaryQuiz = () => {
    initializeBinarySearchQuiz();
  };

  return (
    <main id="main-wrapper">
      <div className="combined-quiz-container">
        {/* Bubble Sort Quiz Section */}
        <div className="quiz-container bubble-sort-quiz">
          <section className="quiz-header">
            <h1>Bubble Sort Quiz</h1>
            <p>
              Test your understanding of Bubble Sort by simulating the steps
              yourself!
            </p>
          </section>

          {bubbleIsQuizComplete ? (
            <section className="quiz-results">
              <h2>Quiz Complete!</h2>
              <p>
                You scored {bubbleUserScore} out of {bubbleQuizSteps.length}{" "}
                steps correctly. See your scores in your profile page!
              </p>
              <button
                onClick={handleRestartBubbleQuiz}
                className="restart-button"
              >
                Restart Quiz
              </button>
            </section>
          ) : (
            <section className="quiz-content">
              <div className="array-display">
                {bubbleDisplayedArray.map((value, index) => {
                  const currentStep = bubbleQuizSteps[bubbleCurrentStepIndex];
                  const highlight =
                    currentStep &&
                    (index === currentStep.j || index === currentStep.j + 1);
                  return (
                    <span
                      key={index}
                      className={`array-element ${
                        highlight ? "highlight" : ""
                      }`}
                    >
                      {value}
                    </span>
                  );
                })}
              </div>

              {bubbleQuizSteps[bubbleCurrentStepIndex] && (
                <>
                  <p className="quiz-instructions">
                    Compare elements at positions{" "}
                    <strong>{bubbleQuizSteps[bubbleCurrentStepIndex].j}</strong>{" "}
                    and{" "}
                    <strong>
                      {bubbleQuizSteps[bubbleCurrentStepIndex].j + 1}
                    </strong>
                    .
                  </p>
                  <p className="quiz-question">
                    Should we swap these two elements?
                  </p>
                  <div className="buttons-container">
                    <button onClick={() => handleBubbleUserGuess("swap")}>
                      Swap
                    </button>
                    <button onClick={() => handleBubbleUserGuess("dontSwap")}>
                      Don't Swap
                    </button>
                  </div>
                  {bubbleAttemptMessage && (
                    <p className="attempt-message">{bubbleAttemptMessage}</p>
                  )}
                  <p className="progress-info">
                    Step {bubbleCurrentStepIndex + 1} of{" "}
                    {bubbleQuizSteps.length}
                  </p>
                </>
              )}

              {!bubbleQuizSteps[bubbleCurrentStepIndex] &&
                !bubbleIsQuizComplete && (
                  <p>Loading next step of the quiz...</p>
                )}
            </section>
          )}
        </div>

        {/* Binary Search Quiz Section */}
        <div className="quiz-container binary-search-quiz">
          <section className="quiz-header">
            <h1>Binary Search Quiz</h1>
            <p>
              Test your understanding of Binary Search with interactive steps!
            </p>
          </section>

          {binaryIsQuizComplete ? (
            <section className="quiz-results">
              <h2>Quiz Complete!</h2>
              <p>
                You scored {binaryUserScore} out of {binaryQuizSteps.length}{" "}
                steps correctly. See your scores in your profile page!
              </p>
              <button
                onClick={handleRestartBinaryQuiz}
                className="restart-button"
              >
                Restart Quiz
              </button>
            </section>
          ) : (
            <section className="quiz-content">
              <div className="array-display">
                {binaryQuizSteps[binaryCurrentStepIndex] ? (
                  binaryDisplayedArray.map((value, index) => {
                    const currentStep = binaryQuizSteps[binaryCurrentStepIndex];
                    if (currentStep.direction !== "found") {
                      const inRange =
                        index >= currentStep.left && index <= currentStep.right;
                      const highlight = index === currentStep.mid;
                      return (
                        <span
                          key={index}
                          className={`array-element ${
                            inRange
                              ? highlight
                                ? "highlight"
                                : ""
                              : "hidden-element"
                          }`}
                        >
                          {value}
                        </span>
                      );
                    } else {
                      const highlight = index === currentStep.mid;
                      return (
                        <span
                          key={index}
                          className={`array-element ${
                            highlight ? "highlight" : ""
                          }`}
                        >
                          {value}
                        </span>
                      );
                    }
                  })
                ) : (
                  <p>Loading array...</p>
                )}
              </div>

              {binaryQuizSteps[binaryCurrentStepIndex] && (
                <>
                  <p className="quiz-instructions">
                    We are searching for the target value:{" "}
                    <strong>{binaryTarget}</strong>
                  </p>
                  {binaryQuizSteps[binaryCurrentStepIndex].found ? (
                    <p>
                      The value at position{" "}
                      <strong>
                        {binaryQuizSteps[binaryCurrentStepIndex].mid}
                      </strong>{" "}
                      matches the target. What happens next?
                    </p>
                  ) : (
                    <p className="quiz-question">
                      Compare target with the middle element at position{" "}
                      <strong>
                        {binaryQuizSteps[binaryCurrentStepIndex].mid}
                      </strong>{" "}
                      which is{" "}
                      <strong>
                        {
                          binaryDisplayedArray[
                            binaryQuizSteps[binaryCurrentStepIndex].mid
                          ]
                        }
                      </strong>
                      . Should we go left or right?
                    </p>
                  )}

                  <div className="buttons-container">
                    {binaryQuizSteps[binaryCurrentStepIndex].found ? (
                      <button onClick={() => handleBinaryUserGuess("found")}>
                        Found Target
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleBinaryUserGuess("left")}>
                          Search Left Half
                        </button>
                        <button onClick={() => handleBinaryUserGuess("right")}>
                          Search Right Half
                        </button>
                      </>
                    )}
                  </div>
                  {binaryAttemptMessage && (
                    <p className="attempt-message">{binaryAttemptMessage}</p>
                  )}
                  <p className="progress-info">
                    Step {binaryCurrentStepIndex + 1} of{" "}
                    {binaryQuizSteps.length}
                  </p>
                </>
              )}

              {!binaryQuizSteps[binaryCurrentStepIndex] &&
                !binaryIsQuizComplete && (
                  <p>Loading next step of the quiz...</p>
                )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
