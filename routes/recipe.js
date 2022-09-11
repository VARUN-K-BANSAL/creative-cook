const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const authWriter = require('../middlewares/authWriter')
const recipeController = require('../controllers/recipe')

router.get('/add', auth, recipeController.showAddPage)
router.post('/add', auth, recipeController.addRecipe)
router.get('/getmyrecipies', auth, recipeController.sendAllMyRecipe)
router.get('/myrecipies', auth, recipeController.sendAllMyRecipePage)
router.get('/all', recipeController.sendAllRecipe)
router.get('/detail/:rid', recipeController.detailPage)
router.get('/edit/:rid', authWriter, recipeController.editPage)
router.post('/edit/:rid', authWriter, recipeController.editRecipe)

module.exports = router;