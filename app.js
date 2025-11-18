import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const pool = mysql2.createPool( {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

}).promise();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));

const PORT = 3000;

app.get('/db-test', async(req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders');
        res.send(orders);
    }
    catch(err) {
        console.error('Database error:', err);
    }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    //res.send('Large Joes Super Pizza is currently closed due to health violations');
    res.render('home');
});

app.get('/contact-us', (req, res) => {
    //res.send('Large Joes Super Pizza is currently closed due to health violations');
    res.render('contact');
});

app.get('/confirm', (req, res) => {
    //res.send('Large Joes Super Pizza is currently closed due to health violations');
    res.render('confirmation');
});

app.get('/admin', async (req, res) => {
    //res.send('Large Joes Super Pizza is currently closed due to health violations');
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
    try {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
        res.render('admin',{orders})
    }
    catch(err) {
        console.error('Database error:', err);
    }
});

app.post('/submit-order', async(req, res) => {
    const order = req.body;
    order.timestamp = new Date();

    const sql = "INSERT INTO orders (fname, lname, pnum, method, toppings, size, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)";

    console.log(order);
    const params = [
        order.fname,
        order.lname,
        order.pnum,
        order.method,
        order.toppings,
        order.size,
        order.timestamp
    ];

    try {
        const [result] = await pool.execute(sql, params);
        res.render('confirmation', { name: order.fname });
    } catch(err) {
        console.log("error");
    }
});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`) ;
});