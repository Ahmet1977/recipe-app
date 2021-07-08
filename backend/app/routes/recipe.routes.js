var express = require("express");
var router = express.Router();

// Model
const RecipeModel = require("../models/recipe.model");

// GET request with node-express-get snippet
router.get('/', (req, res) => {
    // res.send('GET request to the homepage !!!!')
    RecipeModel.find()
    .then((recipe)=>{res.json(recipe)})
    .catch((error)=>{res.json(error)})
  })
  
  //Get details of a recipe api/recipes/:recipeId
  router.get('/:recipeId',(req,res)=>{
    RecipeModel.findById(req.params.recipeId)
    .then((recipe)=>{res.json(recipe)})
    .catch((error)=>{res.json(error)})
  })
  
  
  // POST request to save recipes in the db
  router.post('/',(req, res, next)=>{
    const newrecipe = new RecipeModel(req.body)
    newrecipe.save()
    .then((recipe)=>{res.json(recipe)})
    .catch((error)=>{next({message:error})
    /*res.json(error)*/})
  })
  
  //update a recipe with new info api/recipes/:recipeId
  router.put('/:recipeId', (req, res, next) => {
    RecipeModel.findByIdAndUpdate(req.params.recipeId, req.body, {new:true})
    .then((recipe)=>{res.json(recipe)})
    .catch((error)=>{res.json(error)})
  })
  
  ///delete recipe by id api/recipes/:recipeId
  router.delete('/:recipeId', (req, res, next) => {
    RecipeModel.findByIdAndRemove(req.params.recipeId)
    .then((recipe)=>{res.json(recipe)})
    .catch((error)=>{res.json(error)})
  })
  
  // Export the route
  module.exports = router