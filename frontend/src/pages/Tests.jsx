import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Tests() {

    const [tests, setTests] = useState([]);

    const [testName, setTestName] = useState("");
    const [duration, setDuration] = useState("");
    const [totalQuestions, setTotalQuestions] = useState("");

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {

        try {

            const res = await API.get("/tests");

            setTests(res.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addTest = async () => {

        try {

            await API.post("/tests", {
                test_name: testName,
                duration: duration,
                total_questions: totalQuestions
            });

            alert("Test Added Successfully");

            setTestName("");
            setDuration("");
            setTotalQuestions("");

            fetchTests();

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Tests
                </h2>

                <div className="card p-3 mb-4">

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Test Name"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                    />

                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Duration (Minutes)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Total Questions"
                        value={totalQuestions}
                        onChange={(e) => setTotalQuestions(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={addTest}
                    >
                        Add Test
                    </button>

                </div>

                <table className="table table-bordered table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Test Name</th>
                            <th>Duration</th>
                            <th>Total Questions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {tests.map((test) => (

                            <tr key={test.test_id}>

                                <td>{test.test_id}</td>

                                <td>{test.test_name}</td>

                                <td>{test.duration}</td>

                                <td>{test.total_questions}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Tests;