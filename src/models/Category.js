import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import { required } from "zod/mini";

const categorySchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    },
    icon:{
        type:String,
        default:"Circle"
    },
    color:{
        type:String,
        default:"#3B82F6"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
}
);

const Category=mongoose.model("Category",categorySchema);

export default Category;