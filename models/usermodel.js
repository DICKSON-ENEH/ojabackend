const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullname:{
        type:String
    }, 
    Phone:{
        type:String

    },
email:{
        type:String

    },
    password:{
        type:String

    },
    avatar:{
        type:String

    },
     avatarId:{
        type:String

    },
    isAdmin:{
        type:Boolean

    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
    }]
}, {timestamps:true})

module.exports =mongoose.model("users", userSchema
)