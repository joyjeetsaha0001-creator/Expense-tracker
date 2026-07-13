import mongoose from "mongoose";

const transactionsSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    type:{
        type:String,
        enum:["income","expense"],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    note:{
        type:String,
        default:"",
        trim:true
    }
},
{
    timestamps:true
}
)

const Transaction=mongoose.model("Transaction",transactionsSchema);

export default Transaction;