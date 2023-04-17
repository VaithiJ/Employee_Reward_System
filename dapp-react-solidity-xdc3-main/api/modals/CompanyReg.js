import mongoose from "mongoose";
import  Schema  from "mongoose";

const CompanySchema = new mongoose.Schema({
    comName:{
        type: String,
        required : true,
        unique : true,
    },
    comID:{
        type: String,
        unique : true
    },
    comAddress:{
        type: String,
        required : true,
    },
    comEmail:{
        type: String,
        required : true,
        unique: true,
    },
    password:{
        type : String,
        required : true,
        unique: true,

    },
    mobile:{
        type : Number,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    },

    walletAddress : {
        type: String,
        unique:true
    },
    profile:{
        type: String,
        default:"",
    }

    // status:{
    //     type : Boolean,
    //     required : true,
    //     default : true
    // },

    // tokensPurchased : {
    //     type : Number,
    //     required : true
    // }

})

export default mongoose.model("Company", CompanySchema)