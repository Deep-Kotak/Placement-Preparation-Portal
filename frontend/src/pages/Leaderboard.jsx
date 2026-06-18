import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Leaderboard() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {

        try {

            const res = await API.get("/results");

            const sortedResults =
                res.data.data.sort(
                    (a, b) => b.percentage - a.percentage
                );

            setResults(sortedResults);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4 text-center">
                    🏆 Top Performers Leaderboard
                </h2>

                <table className="table table-bordered table-striped table-hover shadow">

                    <thead className="table-dark">
                        <tr>
                            <th>Rank</th>
                            <th>Student ID</th>
                            <th>Score</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>

                    <tbody>

                        {results.map((result, index) => (

                            <tr key={result.result_id}>

                                <td>
                                    {index === 0
                                        ? "🥇"
                                        : index === 1
                                        ? "🥈"
                                        : index === 2
                                        ? "🥉"
                                        : index + 1}
                                </td>

                                <td>{result.student_id}</td>

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

export default Leaderboard;