// models/user.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/chat.db');

// Create user table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE
  )`);
});

module.exports = db;
