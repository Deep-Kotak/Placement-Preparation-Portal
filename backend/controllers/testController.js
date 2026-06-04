const db = require("../config/db");

// Create Test
const createTest = (req, res) => {

    const {
        test_name,
        duration,
        total_questions
    } = req.body;

    const sql = `
        INSERT INTO tests
        (
            test_name,
            duration,
            total_questions
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql, [
            test_name,
            duration,
            total_questions
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
                message: "Test Created Successfully"
            });

        }
    );

};

// Get All Tests
const getTests = (req, res) => {

    const sql = "SELECT * FROM tests";

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
const deleteTest = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM tests
        WHERE test_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Test Not Found"
            });
        }

        res.json({
            success: true,
            message: "Test Deleted Successfully"
        });

    });

};

// Update Test
const updateTest = (req, res) => {

    const { id } = req.params;

    const {
        test_name,
        duration,
        total_questions
    } = req.body;

    const sql = `
        UPDATE tests
        SET
            test_name = ?,
            duration = ?,
            total_questions = ?
        WHERE test_id = ?
    `;

    db.query(
        sql, [
            test_name,
            duration,
            total_questions,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Test Updated Successfully"
            });

        }
    );

};

module.exports = {
    createTest,
    getTests,
    deleteTest,
    updateTest
};