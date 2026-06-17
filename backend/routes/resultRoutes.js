const express = require("express");
const router = express.Router();

const {
    saveResult,
    getResults,
    updateResult,
    deleteResult
} = require("../controllers/resultController");

// Save Result
router.post("/", saveResult);

// Get All Results
router.get("/", getResults);

// Update Result
router.put("/:id", updateResult);

// Delete Result
router.delete("/:id", deleteResult);

module.exports = router;