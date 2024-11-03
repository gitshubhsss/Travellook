const mongoose=require("mongoose");
const { type } = require("../Schema/listingSchema");


const ReviewSchema=new mongoose.Schema({
    comment:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
  

});

const Review=mongoose.model("Review",ReviewSchema);

module.exports=Review;