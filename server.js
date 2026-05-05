const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json()); 
app.use(express.static('public')); 

const db = new sqlite3.Database('./linguevinchik.db', (err) => {
    if (err) console.error("Помилка відкриття БД:", err.message);
    else console.log("Підключено до бази даних SQLite.");
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        gender TEXT,
        birthDate TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        en TEXT,
        ua TEXT
    )`, () => {
        db.get("SELECT COUNT(*) as count FROM words", (err, row) => {
            if (row.count === 0) {
                const stmt = db.prepare("INSERT INTO words (en, ua) VALUES (?, ?)");
                stmt.run("Apple", "Яблуко");
                stmt.run("Dungeon", "Підземелля");
                stmt.run("Master", "Магістр");
                stmt.run("Study", "Навчання");
                stmt.run("Success", "Успіх");
                stmt.finalize();
            }
        });
    });
});


app.post('/api/register', (req, res) => {
    const { name, email, password, gender, birthDate } = req.body;
    console.log("Отримано запит на реєстрацію:", req.body); 

    const sql = `INSERT INTO users (name, email, password, gender, birthDate) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [name, email, password, gender, birthDate], function(err) {
        if (err) {
            console.error("Помилка БД:", err.message);
            return res.status(400).json({ error: "Цей Email вже зареєстровано або дані некоректні" });
        }
        res.json({ message: "Реєстрація успішна!", userId: this.lastID });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    
    db.get(sql, [email, password], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: "Невірний email або пароль" });
        }
        res.json({ message: "Вхід успішний", user });
    });
});

app.get('/api/words', (req, res) => {
    db.all("SELECT en, ua FROM words", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});