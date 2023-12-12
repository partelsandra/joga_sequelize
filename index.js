const express = require("express")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

// Testing connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Unable to connect to the database', err); // Add a comma here
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to sequelize application" });
});

//using routes and controllers
const articleRouter = require('./routes/article');
app.use('/', articleRouter);
app.use('/article', articleRouter);
app.use('admin/article', articleRouter)
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
