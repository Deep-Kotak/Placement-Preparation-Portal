const db = require("../config/db");


// Add Question
const addQuestion = (req, res) => {

    const {
        category_id,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer
    } = req.body;

    const sql = `
        INSERT INTO questions
        (
            category_id,
            question_text,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, [
            category_id,
            question_text,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer
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
                message: "Question Added Successfully"
            });

        }
    );

};
const getQuestions = (req, res) => {
    console.log("GET Questions API Hit");

    const sql = `
        SELECT *
        FROM questions
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
// Delete Question
const deleteQuestion = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM questions
        WHERE question_id = ?
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
                message: "Question Not Found"
            });
        }

        res.json({
            success: true,
            message: "Question Deleted Successfully"
        });

    });

}; // Update Question
const updateQuestion = (req, res) => {
    console.log("PUT API HIT");

    const { id } = req.params;

    const {
        category_id,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer
    } = req.body;

    const sql = `
        UPDATE questions
        SET
            category_id = ?,
            question_text = ?,
            option_a = ?,
            option_b = ?,
            option_c = ?,
            option_d = ?,
            correct_answer = ?
        WHERE question_id = ?
    `;

    db.query(
        sql, [
            category_id,
            question_text,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Question Not Found"
                });
            }

            res.json({
                success: true,
                message: "Question Updated Successfully"
            });

        }
    );

};

module.exports = {
    addQuestion,
    getQuestions,
    deleteQuestion,
    updateQuestion
};