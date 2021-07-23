import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Food
}

const foodSchema = new Schema({
    name: {
      type: String,
      required:true,
    },
    fridgeTime: Date,
    freezeTime: Date,
    inFridge: Boolean,
    inFreezer: Boolean,
    freshness: Number,
  },{
    timestamps: true,
  });
  
  const Food = mongoose.model("Food", foodSchema);