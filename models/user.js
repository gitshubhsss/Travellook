const mongoose=require("mongoose");

const passport = require("passport");
// const { use } = require("passport");

const passportLocalsMongosse=require("passport-local-mongoose");//requiring hte plugin

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },    
})

UserSchema.plugin(passportLocalsMongosse);//username and password will be automatically added with salt and hash

const User=mongoose.model("User",UserSchema);
module.exports=User;

