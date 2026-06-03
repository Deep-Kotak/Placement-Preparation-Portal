import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Questions() {

  const [questions, setQuestions] = useState([]);

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

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Questions
        </h2>

        <table className="table table-bordered table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Category ID</th>
              <th>Question</th>
              <th>Correct Answer</th>
            </tr>
          </thead>

          <tbody>

            {questions.map((question) => (

              <tr key={question.question_id}>

                <td>{question.question_id}</td>

                <td>{question.category_id}</td>

                <td>{question.question_text}</td>

                <td>{question.correct_answer}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Questions;