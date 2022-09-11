require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const COOKIE_NAME = process.env.COOKIE_NAME
const Recipe = require('../models/recipe')

const auth = async (req, res, next) => {
    try {
        let recipe = await Recipe.findOne({_id: req.params.rid})
        let token = req.cookies[COOKIE_NAME]
        if(token == undefined || token == null) {
            return res.send('You do not have permission')
        }
        token = token.token;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({_id: verifyUser._id})
        if(user == undefined || user == null) {
            return res.send('Invalid User')
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error);
        res.send('You do not have permission')
    }
}

module.exports = auth