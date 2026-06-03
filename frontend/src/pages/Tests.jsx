import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Tests() {

  const [tests, setTests] = useState([]);

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

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Tests
        </h2>

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