const express = require("express");
const router = express.Router();

const {
    createTest,
    getTests,
    deleteTest,
    updateTest
} = require("../controllers/testController");

router.post("/", createTest);
router.get("/", getTests);
router.delete("/:id", deleteTest);
router.put("/:id", updateTest);


module.exports = router;