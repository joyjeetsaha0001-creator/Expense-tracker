import mongoose from "mongoose";



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
        required:false,
        default:""
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

const User =mongoose.models.User || mongoose.model("User", userSchema);

export default User;