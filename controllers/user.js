require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const COOKIE_NAME = process.env.COOKIE_NAME
let encryption = require('../public/scripts/encryption')

const showLoginPage = async (req, res) => {
    let token = req.cookies[COOKIE_NAME]
    if (token != undefined) {
        token = token.token;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        if (verifyUser) {
            const user = await User.findOne({ _id: verifyUser._id })
            if (user) {
                return res.redirect('/')
            } else {
                res.render('login')
            }
        } else {
            return res.render('login')
        }
    } else {
        res.render('login')
    }
}

const showRegisterPage = (req, res) => {
    res.render('register');
}

const checkCreds = async (req, res) => {
    const { email, password } = req.body
    if (email == undefined || email == null || password == undefined || password == null || email == '' || password == '') {
        return res.redirect('/login')
    }

    let user = await User.findOne({ email })
    if (user != null && user != undefined) {
        if (await encryption.comparePasswords(user.password, password)) {
            const token = await user.generateAuthToken();
            res.cookie(COOKIE_NAME, {
                token: token
            })
            await user.save();
            return res.redirect('/')
        }
    }
    res.redirect('/user/login')
}

const addData = async (req, res) => {
    const {
        userName,
        email,
        password,
        batch
    } = req.body

    let encryptedPassword = String(await encryption.encrypt(password))

    let user = await User.findOne({ email })
    if (user) {
        return res.redirect('/user/login')
    }
    try {
        
        const registerUser = new User({
            name: userName,
            email: email,
            password: encryptedPassword
        })
        const token = await registerUser.generateAuthToken();
        await registerUser.save()
        res.cookie(COOKIE_NAME, {
            token: token
        })
        res.redirect('/user/login')
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req, res) => {
    const token = req.cookies[COOKIE_NAME].token
    const verifyUser = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({_id: verifyUser._id})
    if(user) {
        res.clearCookie(COOKIE_NAME)
        req.user.tokens = req.user.tokens.filter((curr) => {
            return curr.token != req.token
        })
        await req.user.save();
        res.redirect('/')
    } else {
        console.log('User not found error');
        res.send('some error occurred');
    }
}

module.exports = {
    showLoginPage,
    showRegisterPage,
    checkCreds,
    addData,
    logout
}