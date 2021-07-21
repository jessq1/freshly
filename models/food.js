import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Food
}

const foodSchema = new Schema({
    name: String,
    rawgId: Number,
    released: Date,
    imageUrl: String,
    collectedBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    // To be filled in later
    // reviews: [reference GameReview],
  },{
    timestamps: true,
  });
  
  const Food = mongoose.model("Food", foodSchema);