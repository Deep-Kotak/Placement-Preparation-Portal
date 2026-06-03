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

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Welcome To Placement Preparation Portal
        </h2>

        <div className="row">

          <div className="col-md-3">
            <div className="card shadow text-center p-3">
              <h5>Categories</h5>
              <h2>{categories}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center p-3">
              <h5>Questions</h5>
              <h2>{questions}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center p-3">
              <h5>Tests</h5>
              <h2>{tests}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow text-center p-3">
              <h5>Results</h5>
              <h2>{results}</h2>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;