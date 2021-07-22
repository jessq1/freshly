import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
  Profile
}

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  myFridge:[{type: Schema.Types.ObjectId, ref: "MyFridge"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)