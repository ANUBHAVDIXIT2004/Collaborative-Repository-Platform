const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
{
    repo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Repository",
        required:true
    },

    name:{
        type:String,
        required:true
    },

    content:{
        type:String,
        default:""
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("File",fileSchema);