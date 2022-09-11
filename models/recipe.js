const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const Recipe = new mongoose.model('Recipe', recipeSchema)

module.exports = Recipe