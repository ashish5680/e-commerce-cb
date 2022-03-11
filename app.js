const express = require('express');
const app = express();

const mongoose = require('mongoose');



const path = require('path');

const seedDB = require('./seed');

const methodOverride = require('method-override');







mongoose.connect('mongodb://localhost:27017/shop-db')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));





// Execute seedDB method
// seedDB();





// Middlewares

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(express.static(path.join(__dirname , 'public')));

app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));



const productRoutes = require('./routes/productRoutes');




app.get('/' , (req,res) => {
    res.send('Home Page');
});




app.use(productRoutes);






// heroku is going to pass this port || localhost port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});