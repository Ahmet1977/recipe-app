const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    publisher_id: Schema.Types.ObjectId,
    title:String,
    publisher:String,
    image_url: String,
    ingredients: [],
   

  });
  
  module.exports = mongoose.model("recipe", RecipeSchema);