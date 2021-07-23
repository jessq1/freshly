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
    fridgeM: {
      type: Number,
      default: 0,
    },
    fridgeW: {
      type: Number,
      default: 0,
    },
    fridgeD: {
      type: Number,
      default: 0,
    },
    freezeM: {
      type: Number,
      default: 0,
    },
    freezeW: {
      type: Number,
      default: 0,
    },
    freezeD: {
      type: Number,
      default: 0,
    },
    inFridge: {
      type: Boolean,
      default: null,
    },
    inFreezer: {
      type: Boolean,
      default: null,
    },
    freezerFriendly: {
      type: Boolean,
      default: true,
    },
    servings:{
      type:Number,
      default:0,
      min:0,
    },
    purchaseDate:{
      type:Date,
      default:null,
    },
    freshness: Number,
  },{
    timestamps: true,
  });
  
  const Food = mongoose.model("Food", foodSchema);