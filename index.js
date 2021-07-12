require('dotenv').config({ path: './config.env'});
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.DBPORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

/* app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }

        db.query("INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hash],
        (err, result) => {
            console.log(err);
    });
    });
});

app.post ("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
        if (err) {
            res.send({ err: err});
        }

        if (result.length > 0) {
           // res.send(result);
           bcrypt.compare(password, result[0].password, (error, response) => {
               if (response) {
                   res.send(result);
               } else {
                res.send({ message: "Wrong username/password combination!" });
               }
           });
        } else {
            res.send({ message: "User doesn't exist" });
        }
    })
}) */

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    });
});

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    const wage = req.body.wage;
    const id = req.body.id;
    
    db.query("UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`yaaay, your server is running on port ${PORT}`);
});