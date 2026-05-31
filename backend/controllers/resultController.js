const db = require("../config/db");

// Save Result
const saveResult = (req, res) => {

    const {
        student_id,
        test_id,
        score,
        percentage
    } = req.body;

    const sql = `
        INSERT INTO results
        (
            student_id,
            test_id,
            score,
            percentage
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql, [
            student_id,
            test_id,
            score,
            percentage
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Result Saved Successfully"
            });

        }
    );

};

// Get All Results
const getResults = (req, res) => {

    const sql = `
        SELECT * FROM results
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: results
        });

    });

};

module.exports = {
    saveResult,
    getResults
};