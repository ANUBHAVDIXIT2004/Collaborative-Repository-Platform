const mongoose = require("mongoose");

const snapshotSchema = new mongoose.Schema({

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

        enum:[
            "ADD",
            "EDIT",
            "DELETE",
            "RESET",
            "RESTORE"
        ],

        required:true

    },

    fileName:{

        type:String,

        default:"Repository"

    },

    snapshot:[snapshotSchema]

},
{
    timestamps:true
});

module.exports = mongoose.model("Commit",commitSchema);