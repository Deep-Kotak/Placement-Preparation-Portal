CREATE DATABASE placement_portal;
USE placement_portal;

CREATE TABLE students(
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    college VARCHAR(100),
    course VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins(
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);
CREATE TABLE categories(
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100)
);

CREATE TABLE questions(
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    question_text TEXT,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer VARCHAR(1),
    FOREIGN KEY(category_id)
    REFERENCES categories(category_id)
);

CREATE TABLE tests(
    test_id INT PRIMARY KEY AUTO_INCREMENT,
    test_name VARCHAR(100),
    duration INT,
    total_questions INT
);

CREATE TABLE results(
    result_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    test_id INT,
    score INT,
    percentage DECIMAL(5,2),
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id)
    REFERENCES students(student_id),
    FOREIGN KEY(test_id)
    REFERENCES tests(test_id)
);

SHOW TABLES;

INSERT INTO admins(username,password)
VALUES('admin','admin123');

INSERT INTO categories(category_name)
VALUES
('Aptitude'),
('Java'),
('Python'),
('DBMS'),
('Operating System'),
('HR');

SELECT * FROM categories;

SHOW DATABASES;

SELECT @@port;

SELECT * FROM students;