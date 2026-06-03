import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logout Successful");

    navigate("/");

  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">

        <span className="navbar-brand">
          Placement Portal
        </span>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;