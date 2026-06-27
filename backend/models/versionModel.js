const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({

    repo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Repository"
    },

    commit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Commit"
    },

    files:[
        {
            name:String,
            content:String
        }
    ]

},{
    timestamps:true
});

module.exports=mongoose.model("Version",versionSchema);