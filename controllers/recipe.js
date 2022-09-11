const Recipe = require('../models/recipe')

const addRecipe = async (req, res) => {
    let {
        title,
        ingredients,
        description,
        encodedImage
    } = req.body
    ingredients = ingredients.split(',')
    let recipe = new Recipe({
        name: title,
        ingredients,
        description,
        writer: req.user._id,
        image: encodedImage
    })
    recipe.save();
    res.redirect('/')
}

const showAddPage = (req, res) => {
    res.render('addRecipe')
}

const sendAllRecipe = async (req, res) => {
    const recipies = await Recipe.find()
    res.send(recipies)
}

const detailPage = async (req, res) => {
    const rid = req.params.rid
    let recipe = await Recipe.findOne({_id: rid})
    if(recipe) {
        recipe.description = recipe.description.split("\n").join("<br>")
        let temp = ""
        for(let i=0; i<recipe.ingredients.length; i++) {
            temp += recipe.ingredients[i]
            temp += "<br>"
        }
        recipe.ingredientsList = temp
        return res.render('recipeDetail', recipe);
    }
    res.redirect('/')
}

const sendAllMyRecipe = async (req, res) => {
    const user = req.user;
    const recipiesData = await Recipe.find();

    let recipies = []
    for(let i=0; i<recipiesData.length; i++) {
        if(recipiesData[i].writer == user._id) {
            recipies.push(recipiesData[i]);
        }
    }

    res.send(recipies);
}

const sendAllMyRecipePage = async (req, res) => {
    res.render('myrecipies')
}

const editPage = async (req, res) => {
    const user = req.user
    const id = req.params.rid
    const recipe = await Recipe.findOne({_id : id})
    if(recipe.writer == user._id) {
        return res.render('editRecipe', recipe)
    }
    res.redirect('/')
}

const editRecipe = async (req, res) => {
    const id = req.params.rid
    let {
        title,
        ingredients,
        description,
        encodedImage
    } = req.body
    ingredients = ingredients.split(',')
    let recipe = await Recipe.findOne({_id : id})
    if(recipe) {
        recipe.name = title;
        recipe.ingredients = ingredients
        recipe.description = description
        recipe.image = encodedImage
        recipe.save();
        return res.redirect('/')
    }
    res.redirect('/')
}

module.exports = {
    addRecipe,
    showAddPage,
    sendAllRecipe,
    detailPage,
    sendAllMyRecipe,
    sendAllMyRecipePage,
    editPage,
    editRecipe
}