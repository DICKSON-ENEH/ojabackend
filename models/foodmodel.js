const mongoose = require('mongoose')

// const Schema = mongoose.Schema
const orderSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    quantity:{
        type:String
    },
    price:{
        type:String
    },
    balance:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
     },
    image:{
        type:String
    },
    imageId:{
        type:String
    }
}, {timestamps:true})
module.exports =mongoose.model("order", orderSchema)