import Mongoose from "mongoose";

const todoSchema = new Mongoose.Schema({
  title: { type: String },
  todo: { type: String },
  date: { type: Date, default: Date.now, },
});


Mongoose.models = {}
export default Mongoose.model("Todos",todoSchema);