// Get connection to database ORM object
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize');

// Read models data for table representation
const models = require('../models');
const Article = require('../models/article')(sequelize, Sequelize.DataTypes);

// Get all data from table
const getAllArticles = (req, res) => {
    Article.findAll()
        .then(articles => {
            console.log(articles)
            return res.status(200).json({articles});
        })
        .catch (error => {
            return res.status(500).send(error.message);
        })
}


// Show article by this slug
const getArticleBySlug = (req, res) => {
    models.Article.findOne({
        where: {
            slug : req.params.slug
        },
        include: [
            {
                model: models.Author
            },
            {
                model: models.Tag,
                through: {
                    model: models.ArticleTag
                }
            }],
    })
        .then(article =>  {
            console.log(article)
            return res.status(200).json({article})
        })
        .catch (error => {
            return res.status(500).send(error.message);
        })
}


//export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug
};
