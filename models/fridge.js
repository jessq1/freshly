import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	MyFridge
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


const myFridgeSchema = new Schema({
    fridge: [fridgeSchema],
    freezer: [freezerSchema],
  },{
    timestamps: true,
  });
  
  const MyFridge = mongoose.model("MyFridge", myFridgeSchema);