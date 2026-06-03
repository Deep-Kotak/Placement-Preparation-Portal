import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");

  const handleRegister = async () => {

    try {

      await API.post("/auth/register", {
        full_name,
        email,
        password,
        college,
        course
      });

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{maxWidth:"500px"}}>
        <h2 className="text-center mb-4">Register</h2>

        <input className="form-control mb-2" placeholder="Full Name"
          onChange={(e)=>setFullName(e.target.value)} />

        <input className="form-control mb-2" placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)} />

        <input type="password" className="form-control mb-2" placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)} />

        <input className="form-control mb-2" placeholder="College"
          onChange={(e)=>setCollege(e.target.value)} />

        <input className="form-control mb-3" placeholder="Course"
          onChange={(e)=>setCourse(e.target.value)} />

        <button className="btn btn-success w-100"
          onClick={handleRegister}>
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;