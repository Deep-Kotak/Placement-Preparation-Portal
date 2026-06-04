const express = require("express");
const router = express.Router();

const {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory
} = require("../controllers/categoryController");

// Add Category
router.post("/", addCategory);

// Get Categories
router.get("/", getCategories);

// Delete Category
router.delete("/:id", deleteCategory);

// Update Category
router.put("/:id", updateCategory);

module.exports = router;