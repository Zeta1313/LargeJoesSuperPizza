import express from 'express';

const app = express();

const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    //res.send('Large Joes Super Pizza is currently closed due to health violations');
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`) ;
});