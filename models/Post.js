import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    userId: {
        type: String,
        required: true,
      },
    description:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true,
    },
  

}, { timestamps: true})

export default mongoose.model("post", PostSchema)

