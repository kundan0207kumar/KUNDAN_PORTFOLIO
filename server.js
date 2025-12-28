const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",       // apna password
    database: "portfolio_db"
});

db.connect(err => {
    if (err) {
        console.log("MySQL Connection Failed", err);
    } else {
        console.log("MySQL Connected");
    }
});

// API to save contact form data
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});



