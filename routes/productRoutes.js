
const express = require('express');

const router = express.Router();

const Product = require('../models/product');




//Get all the products 
router.get('/products' , async(req, res) => {


    // res.send('Index Page');

    const products = await Product.find({});

    res.render('products/index' , {products});
});







// Get the new form to create new product
router.get('/products/new', (req, res) => {
    res.render('products/new');
});





// create a new product with the given payload
router.post('/products' , async(req,res) => {

    const newProduct = {
        ...req.body
    }

    await Product.create(newProduct);

    res.redirect('/products');

});












// Show a particular product
router.get('/products/:id' , async(req, res) => {

    //Destructure the id from req.params object
    const {id} = req.params;

    const product = await Product.findById(id);

    res.render('products/show', {product});
});











// Show a Edit form Page
router.get('/products/:id/edit', async(req,res) => {

    const {id} = req.params;

    const product = await Product.findById(id);

    res.render('products/edit' , {product});

});



// Update the product with the given payload
router.patch('/products/:id' ,async(req, res) => {

    const updatedProduct = req.body;

    const {id} = req.params;

    await Product.findByIdAndUpdate(id, updatedProduct);


    // `` this is called string template literals
    res.redirect(`/products/${id}`);

});













router.delete('/products/:id' , async(req, res) => {

    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.redirect('/products');

})













module.exports = router;