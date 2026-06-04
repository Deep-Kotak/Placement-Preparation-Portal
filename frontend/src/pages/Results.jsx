import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Results() {

    const [results, setResults] = useState([]);

    const [studentId, setStudentId] = useState("");
    const [testId, setTestId] = useState("");
    const [score, setScore] = useState("");
    const [percentage, setPercentage] = useState("");

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

    const addResult = async () => {

        try {

            await API.post("/results", {
                student_id: studentId,
                test_id: testId,
                score: score,
                percentage: percentage
            });

            alert("Result Added Successfully");

            setStudentId("");
            setTestId("");
            setScore("");
            setPercentage("");

            fetchResults();

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

                <div className="card p-3 mb-4">

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Test ID"
                        value={testId}
                        onChange={(e) => setTestId(e.target.value)}
                    />

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Score"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Percentage"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={addResult}
                    >
                        Add Result
                    </button>

                </div>

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