const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title:String,
    author:String,
    image_url: String
  });
  
  module.exports = mongoose.model("recipe", RecipeSchema);