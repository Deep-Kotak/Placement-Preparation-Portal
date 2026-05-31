const express = require("express");
const router = express.Router();

const {
    createTest,
    getTests,
    deleteTest
} = require("../controllers/testController");

router.post("/", createTest);
router.get("/", getTests);
router.delete("/:id", deleteTest);


module.exports = router;