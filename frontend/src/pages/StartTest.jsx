import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StartTest() {

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const [score, setScore] = useState(0);
    const [testCompleted, setTestCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    const navigate = useNavigate();

    useEffect(() => {

        if (timeLeft <= 0) {

            autoSubmitTest();

            return;

        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    const fetchQuestions = async () => {

        try {

            const res = await API.get("/questions");

            setQuestions(res.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const saveResult = async (finalScore) => {

        try {

            await API.post("/results", {
                student_id: 1,
                test_id: 1,
                score: finalScore,
                percentage:
                    (finalScore / questions.length) * 100
            });

            alert("Result Saved Successfully");

        } catch (error) {

            console.log(error);

        }

    };

    const handleNext = async () => {

        let newScore = score;

        if (
            selectedAnswer ===
            questions[currentQuestion].correct_answer
        ) {

            newScore = score + 1;
            setScore(newScore);

        }

        setSelectedAnswer("");

        if (
            currentQuestion <
            questions.length - 1
        ) {

            setCurrentQuestion(
                currentQuestion + 1
            );

        } else {

            await saveResult(newScore);

            setTestCompleted(true);

        }

    };
    const autoSubmitTest = async () => {

    await saveResult(score);

    setTestCompleted(true);

};
    if (testCompleted) {

        return (

            <div className="container mt-5">

                <div className="card p-4 text-center">

                    <h2>
                        Test Completed 🎉
                    </h2>

                    <h3 className="mt-3">
                        Score: {score} / {questions.length}
                    </h3>

                </div>

            </div>

        );

    }

    return (
        <div className="container mt-5">

            <h2 className="mb-4">
                Start Test
            </h2>

            <div className="alert alert-warning">

                ⏱️ Time Left:
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
            </div>

            {
                questions.length > 0 && (

                    <div className="card p-4">

                        <h5>
                            Question {currentQuestion + 1} of {questions.length}
                        </h5>

                        <h4 className="mb-4">
                            {questions[currentQuestion].question_text}
                        </h4>

                        <div className="form-check">
                            <input
                                type="radio"
                                name="answer"
                                className="form-check-input"
                                value="A"
                                checked={selectedAnswer === "A"}
                                onChange={(e) =>
                                    setSelectedAnswer(e.target.value)
                                }
                            />
                            <label className="form-check-label">
                                {questions[currentQuestion].option_a}
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="radio"
                                name="answer"
                                className="form-check-input"
                                value="B"
                                checked={selectedAnswer === "B"}
                                onChange={(e) =>
                                    setSelectedAnswer(e.target.value)
                                }
                            />
                            <label className="form-check-label">
                                {questions[currentQuestion].option_b}
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="radio"
                                name="answer"
                                className="form-check-input"
                                value="C"
                                checked={selectedAnswer === "C"}
                                onChange={(e) =>
                                    setSelectedAnswer(e.target.value)
                                }
                            />
                            <label className="form-check-label">
                                {questions[currentQuestion].option_c}
                            </label>
                        </div>

                        <div className="form-check mb-4">
                            <input
                                type="radio"
                                name="answer"
                                className="form-check-input"
                                value="D"
                                checked={selectedAnswer === "D"}
                                onChange={(e) =>
                                    setSelectedAnswer(e.target.value)
                                }
                            />
                            <label className="form-check-label">
                                {questions[currentQuestion].option_d}
                            </label>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            {
                                currentQuestion ===
                                    questions.length - 1
                                    ? "Submit Test"
                                    : "Next"
                            }
                        </button>

                    </div>

                )
            }

        </div>
    );
}

export default StartTest;