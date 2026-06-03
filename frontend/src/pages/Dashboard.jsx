import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card shadow p-4">

          <h2>
            Welcome To Placement Preparation Portal
          </h2>

          <p>
            Login Successful
          </p>

        </div>
      </div>
    </>
  );
}

export default Dashboard;