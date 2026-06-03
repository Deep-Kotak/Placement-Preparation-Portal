import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Categories from "./pages/Categories";
import Questions from "./pages/Questions";
import Tests from "./pages/Tests";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/questions"
          element={<Questions />}
        />

        <Route
          path="/tests"
          element={<Tests />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;