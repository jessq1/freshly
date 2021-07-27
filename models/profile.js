import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
  Profile
}

// const fridgeSchema = new Schema({
//   food: [{type: Schema.Types.ObjectId, ref: 'Food'}]
// }, {
//   timestamps: true
// });

// const freezerSchema = new Schema({
//   food: [{type: Schema.Types.ObjectId, ref: 'Food'}]
// }, {
//   timestamps: true
// });

const myFoodSchema = new Schema({
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
    default: false,
  },
  inFreezer: {
    type: Boolean,
    default: false,
  },
  freezerFriendly: {
    type: Boolean,
    default: true,
  },
  servings:{
    type:Number,
    default:1,
    min:0,
  },
  purchaseDate:{
    type:Date,
    default:function(){
      new Date().getDate()
    },
  },
  foodId:{
    type:String,
  },
  freshness: Number,
},{
  timestamps: true,
});

const listSchema = new Schema({
  food: [{type: Schema.Types.ObjectId, ref: 'Food'}]
}, {
  timestamps: true
});

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  bio: String,
  fridgeFood: [myFoodSchema],
  freezerFood: [myFoodSchema],
  list:[listSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)