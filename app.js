const express = require('express');
const app = express();
const { DBInit } = require('./src/utils/DBInit')
const { handleError, handleUnknownRoute } = require('./src/middlewares/handleError')

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const DBUrl = process.env.DB_URL;

app.use(express.static('public'))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const userRoute = require('./src/routes/userRoute')
const categoryRoute = require('./src/routes/categoryRoute')
const productRoute = require('./src/routes/productRoute')

app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute)
app.use('/api/products', productRoute)

app.all('*', handleUnknownRoute);
app.use(handleError);

app.listen(port, async () => {
    try {
        await DBInit(DBUrl);
        console.log('MongoDB connected...');
        console.log(`Server listening on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});
