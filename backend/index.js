const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const PORT = process.env.PORT | 3000
const api = process.env.API_URL;

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose.connect(process.env.MONGO_URL).then(
    console.log("Connected to mongoDB")
).catch(err => console.log(err))

app.listen(PORT, ()=>{
    console.log("server is listening on port", PORT)
})