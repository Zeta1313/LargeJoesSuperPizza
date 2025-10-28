import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));

const orders = [];

const PORT = 3000;

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

app.get('/admin', (req, res) => {
    //res.send('Large Joes Super Pizza is currently closed due to health violations');
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
    res.send(orders);
});

app.post('/submit-order', (req, res) => {
    //res.send('Large Joes Super Pizza is currently closed due to health violations');
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
    //console.log(req.body);

    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        pnum: req.body.pnum,
        method: req.body.method,
        toppings: req.body.toppings,
        size: req.body.size
    }
    orders.push(order);
    console.log(order);
    res.render('confirmation', { name: order.fname});
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`) ;
});