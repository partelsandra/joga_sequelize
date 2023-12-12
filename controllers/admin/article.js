// Get connection to database ORM object
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')
// Read models data for table representation
const models = require('../models');

// Create new article into data table
const createArticle = (req, res) => {
    // get form data
    let name = req.body.name
    let slug = req.body.slug
    let image = req.body.image
    let body = req.body.body

    //create new article by Article model
    const newArticle = models.Article.create({
        // Add values for NOT NULL fields
        // Left one: data table fields,
        // right one: values from form
        name: name,
        slug: slug,
        image: image,
        body: body,
        // Publish date generate as now
        published: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })
        .then(article => {
            console.log(article);
            return res.status(200).json({ message: 'New article is added' });
        })
        .catch(error => {
            return res.status(500).send(error.message);
        });
};

// Export controller functions
module.exports = {
    createArticle
};
