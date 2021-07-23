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
    // fridgeTime: Date,
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
    // freezeTime: Date,
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
    freshness: Number,
  },{
    timestamps: true,
  });
  
  const Food = mongoose.model("Food", foodSchema);