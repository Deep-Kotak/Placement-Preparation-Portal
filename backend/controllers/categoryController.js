const db = require("../config/db");

// Add Category
const addCategory = (req, res) => {
    const { category_name } = req.body;

    const sql = `
        INSERT INTO categories (category_name)
        VALUES (?)
    `;

    db.query(sql, [category_name], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Category Added Successfully"
        });
    });
};

// Get All Categories
const getCategories = (req, res) => {

    const sql = "SELECT * FROM categories";

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

// Delete Category
const deleteCategory = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM categories
        WHERE category_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Category Deleted Successfully"
        });

    });

};

module.exports = {
    addCategory,
    getCategories,
    deleteCategory
};