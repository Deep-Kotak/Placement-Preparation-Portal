import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Results() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {

    try {

      const res = await API.get("/results");

      setResults(res.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Results
        </h2>

        <table className="table table-bordered table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Test ID</th>
              <th>Score</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>

            {results.map((result) => (

              <tr key={result.result_id}>

                <td>{result.result_id}</td>

                <td>{result.student_id}</td>

                <td>{result.test_id}</td>

                <td>{result.score}</td>

                <td>{result.percentage}%</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Results;