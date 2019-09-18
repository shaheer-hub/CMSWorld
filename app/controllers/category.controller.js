const Category = require('../models/Category.js');

// Create and Save a new category
exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Create a category
    const category = new Category({
        title: req.body.title || "Untitled Categery", 
        content: req.body.content
    });

    // Save category in the database
    category.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the category."
        });
    });
};

// Retrieve and return all categorys from the database.
exports.findAll = (req, res) => {
    Category.find()
    .then(categories=> {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving categorys."
        });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
 
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {

};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {

};