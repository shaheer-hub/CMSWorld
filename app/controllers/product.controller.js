const Product = require('../models/Product.js');

// Create and Save a new category
exports.create = (req, res) => {
    
   Product.findOne({name:req.body.name} , function(err,product){
       if(product){
           res.status(200).json({"product":"product already exists"})
       }
       else{
           // Create a category
    const product = new Product({
        name: req.body.name || "Untitled Product", 
        price: req.body.price,
        details:req.body.details,
        category:req.body.category
    });

    // Save category in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });

       }
   })
    
};

// Retrieve and return all categorys from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products=> {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
 Product.findById(req.params.productId)
    .then(product=>{
        if(!product){
            return res.status(404).send({
                message:"Product Not Found with id" +req.params.productId
            });
        }
        else{
            res.send(product);
        }
    }).catch(err=>{
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message:"Product Not Found with id" +req.params.productId
            });
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
    Product.findOne({name:req.body.name} , function(err,product){
        if(product){
            res.status(200).json({"product":"product already exists"})
        }
        else{
            
            Product.findByIdAndUpdate(req.params.productId,{
                name: req.body.name || "Untitled Product",
                price: req.body.price,
                details: req.body.details
            }, {new:true})
            .then(product =>{
                if(!product){
                    return res.status(404).send({
                        message:"Product not found with id" + req.params.productId
                    });
                }
                res.send(product)
            }).catch(err=>{
                if(err.kind == 'ObjectId'){
                    return res.status(404).send({
                        message:"Product not found with id" + req.params.productId
                    });
                }
                return res.status(500).send({
                    message:"Error updating the product at id" + req.params.productId
                });
            });         
 
        }
    })
  
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};