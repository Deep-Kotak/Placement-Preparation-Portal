import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Tests() {

    const [tests, setTests] = useState([]);

    const [testName, setTestName] = useState("");
    const [duration, setDuration] = useState("");
    const [totalQuestions, setTotalQuestions] = useState("");

    const [editId, setEditId] = useState(null);

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

            clearForm();

            fetchTests();

        } catch (error) {

            console.log(error);

        }

    };

    const updateTest = async () => {

        try {

            await API.put(`/tests/${editId}`, {
                test_name: testName,
                duration: duration,
                total_questions: totalQuestions
            });

            alert("Test Updated Successfully");

            setEditId(null);

            clearForm();

            fetchTests();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteTest = async (id) => {

        try {

            await API.delete(`/tests/${id}`);

            alert("Test Deleted Successfully");

            fetchTests();

        } catch (error) {

            console.log(error);

        }

    };

    const editTest = (test) => {

        setEditId(test.test_id);

        setTestName(test.test_name);
        setDuration(test.duration);
        setTotalQuestions(test.total_questions);

    };

    const clearForm = () => {

        setTestName("");
        setDuration("");
        setTotalQuestions("");

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

                    {
                        editId ? (
                            <button
                                className="btn btn-warning"
                                onClick={updateTest}
                            >
                                Update Test
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={addTest}
                            >
                                Add Test
                            </button>
                        )
                    }

                </div>

                <table className="table table-bordered table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Test Name</th>
                            <th>Duration</th>
                            <th>Total Questions</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {tests.map((test) => (

                            <tr key={test.test_id}>

                                <td>{test.test_id}</td>

                                <td>{test.test_name}</td>

                                <td>{test.duration}</td>

                                <td>{test.total_questions}</td>

                                <td>

                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => editTest(test)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteTest(test.test_id)
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

export default Tests;