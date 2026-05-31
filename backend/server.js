const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const categoryRoutes = require("./routes/categoryRoutes");
const questionRoutes = require("./routes/questionRoutes");
const testRoutes = require("./routes/testRoutes");
const resultRoutes = require("./routes/resultRoutes");

// Load Environment Variables
dotenv.config();

// Debugging (Temporary)
console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_PORT =", process.env.DB_PORT);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD);
console.log("DB_NAME =", process.env.DB_NAME);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/results", resultRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Placement Preparation Portal API Running");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});