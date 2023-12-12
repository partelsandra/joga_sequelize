// Get connection to database ORM object
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize');

// Read models data for table representation
const models = require('../models');
const Article = require('../models/article')(sequelize, Sequelize.DataTypes);

// Get all data from table
const getAllArticles = (req, res) => {
    models.findAll() // Corrected the syntax here
        .then(articles => {
            console.log(articles);
            return res.status(200).json({ articles });
        })
        .catch(error => {
            return res.status(500).json({ error: error.message });
        });
}

// Show article by this slug
const getArticleBySlug = (req, res) => {
    models.findOne({
        where: {
            slug: req.params.slug
        },
        include: [{
            model:models.Author
        }],
    })
        .then(article => {
            if (article) {
                console.log(article);
                return res.status(200).json({ article });
            } else {
                return res.status(404).json({ message: 'Article not found' });
            }
        })
        .catch(error => {
            return res.status(500).send(error.message);
        });
};


// Export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug
};
