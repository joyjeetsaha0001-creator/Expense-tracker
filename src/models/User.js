import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { lowercase, required } from "zod/mini";


const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:""
    },
    currency:{
        type:String,
        default:"INR",
    },
    
},
{
    timestamps:true
}
);

const User=mongoose.model("User",userSchema);

export default User;