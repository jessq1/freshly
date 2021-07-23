import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
  Profile
}

const fridgeSchema = new Schema({
  food: [{type: Schema.Types.ObjectId, ref: 'Food'}]
}, {
  timestamps: true
});

const freezerSchema = new Schema({
  food: [{type: Schema.Types.ObjectId, ref: 'Food'}]
}, {
  timestamps: true
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
  fridge: fridgeSchema,
  freezer: freezerSchema,
  list:[listSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)