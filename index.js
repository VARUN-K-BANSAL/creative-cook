require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const STATIC_PATH = path.join(__dirname + '/public')
require('./public/db/conn')

app.set("view engine", "ejs")
app.use(express.static(STATIC_PATH));
app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const userRoutes = require('./routes/user')
const databaseapi = require('./routes/databaseapi')
const recipeRoutes = require('./routes/recipe')

app.listen(PORT, (req, res) => {
    console.log(`Server started at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/user', userRoutes)
app.use(databaseapi)
app.use('/recipe', recipeRoutes)