import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Recipe
}

const recipeSchema = new Schema({
    label: String,
  ingredientLines: [],
  image: String,
  imageUrl: String,
  shareAs:String,
},{
  timestamps: true,
});

const Recipe = mongoose.model("Recipe", recipeSchema);