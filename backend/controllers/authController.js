const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Student
const registerStudent = async(req, res) => {
    const { full_name, email, password, college, course } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
      INSERT INTO students
      (full_name, email, password, college, course)
      VALUES (?, ?, ?, ?, ?)
    `;

        db.query(
            sql, [full_name, email, hashedPassword, college, course],
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Student Registered Successfully",
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Login Student
const loginStudent = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM students WHERE email = ?";

    db.query(sql, [email], async(err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = jwt.sign({
                student_id: user.student_id,
                email: user.email,
            },
            process.env.JWT_SECRET, {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.student_id,
                name: user.full_name,
                email: user.email,
                college: user.college,
                course: user.course
            },
        });
    });
};

const dashboard = (req, res) => {

    res.json({
        success: true,
        message: "Welcome To Dashboard",
        user: req.user
    });

};

module.exports = {
    registerStudent,
    loginStudent,
    dashboard
};