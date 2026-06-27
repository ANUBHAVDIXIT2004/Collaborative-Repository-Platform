const mongoose = require("mongoose");

const snapshotFileSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    content:{
        type:String,
        default:""
    }
},
{
    _id:false
});

const commitSchema = new mongoose.Schema({

    repo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Repository",
        required:true
    },

    parentCommit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Commit",
        default:null
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message:{
        type:String,
        required:true
    },

    action:{
        type:String,
        enum:["ADD","DELETE","EDIT","RESET"],
        required:true
    },

    fileName:{
        type:String,
        default:"Repository"
    },

    snapshot:[snapshotFileSchema]

},{
    timestamps:true
});

module.exports = mongoose.model("Commit",commitSchema);