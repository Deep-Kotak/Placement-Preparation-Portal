import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [tests, setTests] = useState(0);
  const [results, setResults] = useState(0);

  const [recentResults, setRecentResults] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const categoryRes = await API.get("/categories");
      const questionRes = await API.get("/questions");
      const testRes = await API.get("/tests");
      const resultRes = await API.get("/results");

      setCategories(categoryRes.data.data.length);
      setQuestions(questionRes.data.data.length);
      setTests(testRes.data.data.length);
      setResults(resultRes.data.data.length);

      setRecentResults(
        resultRes.data.data.slice(-5).reverse()
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Dashboard Analytics 📊
        </h2>

        <div className="row">

          <div className="col-md-3">
            <div className="card text-white bg-primary shadow text-center p-3">
              <h5>Categories</h5>
              <h2>{categories}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-success shadow text-center p-3">
              <h5>Questions</h5>
              <h2>{questions}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-warning shadow text-center p-3">
              <h5>Tests</h5>
              <h2>{tests}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-danger shadow text-center p-3">
              <h5>Results</h5>
              <h2>{results}</h2>
            </div>
          </div>

        </div>

        <div className="card shadow mt-5">

          <div className="card-header">
            <h4>Recent Results</h4>
          </div>

          <div className="card-body">

            <table className="table table-bordered">

              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Test ID</th>
                  <th>Score</th>
                  <th>Percentage</th>
                </tr>
              </thead>

              <tbody>

                {recentResults.map((result) => (

                  <tr key={result.result_id}>

                    <td>{result.student_id}</td>
                    <td>{result.test_id}</td>
                    <td>{result.score}</td>
                    <td>{result.percentage}%</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;