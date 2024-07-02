const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const { connectDB } = require('../database/database');
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));
const userRoutes = require('../routes/user.routes');


// app.set('views', path.join(__dirname, '../views'));
connectDB();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.render("index_1");
});

app.get('/contact', (req, res) => {
    res.render("contact");
});

app.get('/cart', (req, res) => {
    res.send("cart");
});



app.listen(process.env.PORT, () => {
    console.log(`Server is live at 127.0.0.1:${port}`);
});