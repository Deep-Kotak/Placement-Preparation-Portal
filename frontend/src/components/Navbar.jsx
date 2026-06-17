import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logout Successful");

    navigate("/");

  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/dashboard"
        >
          Placement Portal
        </Link>

        <div className="navbar-nav">

          <Link
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="nav-link"
            to="/categories"
          >
            Categories
          </Link>

          <Link
            className="nav-link"
            to="/questions"
          >
            Questions
          </Link>

          <Link
            className="nav-link"
            to="/tests"
          >
            Tests
          </Link>

          <Link
            className="nav-link"
            to="/start-test"
          >
            Start Test
          </Link>

          <Link
            className="nav-link"
            to="/results"
          >
            Results
          </Link>

        </div>

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