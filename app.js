// app.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Import cors package
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // Gunakan middleware cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: "localhost",
  user: "rizalwiyono",
  password: "rizal000314",
  database: "motorbike",
});

// Tes koneksi
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Tambahkan rute atau endpoints di sini

// Port server
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ motorbikes: results });
    }
  });
});

app.post("/users", (req, res) => {
  const { full_name, email, password, role } = req.body;
  const insertQuery =
    "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(insertQuery, [full_name, email, password, role], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(201)
        .json({ message: "User added successfully", id: result.insertId });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  db.query(
    `SELECT * FROM users WHERE email='${email}' AND password='${password}' AND role='${role}'`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (results.length > 0) {
          res.status(200).json({ motorbikes: results });
        } else {
          res.status(500).json({ error: "Email atau Password Salah" });
        }
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query(`DELETE FROM users WHERE id='${userId}'`, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ motorbikes: results });
    }
  });
});

app.post("/add/product", (req, res) => {
  const { title, description, price } = req.body;
  const insertQuery =
    "INSERT INTO products (title, description, price) VALUES (?, ?, ?)";
  db.query(insertQuery, [title, description, price], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(201)
        .json({ message: "Product added successfully", id: result.insertId });
    }
  });
});

app.delete("/product/:id", (req, res) => {
  const userId = req.params.id;
  db.query(`DELETE FROM products WHERE id='${userId}'`, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    }
  });
});

app.get("/articles", (req, res) => {
  db.query("SELECT * FROM article", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ motorbikes: results });
    }
  });
});

app.post("/add/article", (req, res) => {
  const { title, description } = req.body;
  const insertQuery =
    "INSERT INTO article (title, description) VALUES (?, ?)";
  db.query(insertQuery, [title, description], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(201)
        .json({ message: "Article added successfully", id: result.insertId });
    }
  });
});

app.delete("/article/:id", (req, res) => {
  const userId = req.params.id;
  db.query(`DELETE FROM article WHERE id='${userId}'`, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Article deleted successfully" });
      } else {
        res.status(404).json({ error: "Article not found" });
      }
    }
  });
});