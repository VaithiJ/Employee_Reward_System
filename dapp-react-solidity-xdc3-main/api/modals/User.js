import mongoose from "mongoose";
import  Schema  from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        unique : true,
    },
    
    password:{
        type: String,
         required : true,
    },
    email:{
        type: String,
        required : true,
        unique : true,
    },
    DOJ : {
        type : Date,
        required : true
    },
    mobile:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required : true,
    },
    wallet:{
        type: String,
        required: true,
        unique:true
    },
    isOnboarded:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default: false,
    }
    
    // proof:{
    //     type:Document,
    //     required: true
    // }


},{timestamps:true})


export default mongoose.model("Users", UserSchema)