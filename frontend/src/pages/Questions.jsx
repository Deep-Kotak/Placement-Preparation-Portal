import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Questions() {

    const [questions, setQuestions] = useState([]);

    const [categoryId, setCategoryId] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {

        try {

            const res = await API.get("/questions");

            setQuestions(res.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addQuestion = async () => {

        try {

            await API.post("/questions", {
                category_id: categoryId,
                question_text: questionText,
                option_a: optionA,
                option_b: optionB,
                option_c: optionC,
                option_d: optionD,
                correct_answer: correctAnswer
            });

            alert("Question Added Successfully");

            clearForm();

            fetchQuestions();

        } catch (error) {

            console.log(error);

        }

    };

    const updateQuestion = async () => {

        try {

            await API.put(`/questions/${editId}`, {
                category_id: categoryId,
                question_text: questionText,
                option_a: optionA,
                option_b: optionB,
                option_c: optionC,
                option_d: optionD,
                correct_answer: correctAnswer
            });

            alert("Question Updated Successfully");

            setEditId(null);

            clearForm();

            fetchQuestions();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteQuestion = async (id) => {

        try {

            await API.delete(`/questions/${id}`);

            alert("Question Deleted Successfully");

            fetchQuestions();

        } catch (error) {

            console.log(error);

        }

    };

    const editQuestion = (question) => {

        setEditId(question.question_id);

        setCategoryId(question.category_id);
        setQuestionText(question.question_text);

        setOptionA(question.option_a);
        setOptionB(question.option_b);
        setOptionC(question.option_c);
        setOptionD(question.option_d);

        setCorrectAnswer(question.correct_answer);

    };

    const clearForm = () => {

        setCategoryId("");
        setQuestionText("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setCorrectAnswer("");

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Questions
                </h2>

                <div className="card p-3 mb-4">

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Category ID"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    />

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Question Text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Option A"
                        value={optionA}
                        onChange={(e) => setOptionA(e.target.value)}
                    />

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Option B"
                        value={optionB}
                        onChange={(e) => setOptionB(e.target.value)}
                    />

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Option C"
                        value={optionC}
                        onChange={(e) => setOptionC(e.target.value)}
                    />

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Option D"
                        value={optionD}
                        onChange={(e) => setOptionD(e.target.value)}
                    />

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Correct Answer (A/B/C/D)"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                    />

                    {
                        editId ? (
                            <button
                                className="btn btn-warning"
                                onClick={updateQuestion}
                            >
                                Update Question
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={addQuestion}
                            >
                                Add Question
                            </button>
                        )
                    }

                </div>

                <table className="table table-bordered table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category ID</th>
                            <th>Question</th>
                            <th>Correct Answer</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {questions.map((question) => (

                            <tr key={question.question_id}>

                                <td>{question.question_id}</td>

                                <td>{question.category_id}</td>

                                <td>{question.question_text}</td>

                                <td>{question.correct_answer}</td>

                                <td>

                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => editQuestion(question)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteQuestion(question.question_id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Questions;