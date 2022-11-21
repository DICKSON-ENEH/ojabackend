require("dotenv").config()
const userModel = require("../models/usermodel")
const bcrypt= require("bcrypt")
const jwt =  require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")


const getallusers = async(req, res)=>{
    try {
        const user = await userModel.find()
        res.status(200).json({
            message:"all users",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}

const getoneusers = async(req, res)=>{
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json({
            message:"all users",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}
const editoneusers = async(req, res)=>{
    try {
        const {phone, fullname}= req.body
        const cloudy = await cloudinary.uploader.upload(req.file.path)
        const user = await userModel.findByIdAndUpdate(req.params.id, {
            phone,
            fullname, 
            avatar:cloudy.secure_url,
            avatarId:cloudy.public_id
        })
        res.status(200).json({
            message:"all users",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}
const deleteoneusers = async(req, res)=>{
    try {
        const user = await userModel.findByIdAndDeleted(req.params.id)
        res.status(200).json({
            message:"all users"
         
        })
    } catch (error) {
        console.log(error)
    }
}
const createoneusers = async(req, res)=>{
    try {
     const  {fullname, email, phone, password} = req.body
const salt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash(password, salt)
const cloudy = await cloudinary.uploader.upload(req.file.path)

const user = await userModel.create({
    fullname, email, phone, password:hashed,
    avatar:cloudy.secure_url,
            avatarId:cloudy.public_id
})
        res.status(201).json({
            message:"all users",
            data:user
         
        })
    } catch (error) {
        console.log(error)
    }
}

 
        
  
const createoneadmin = async(req, res)=>{
    try {
     const  {fullname, email, phone, password, isAdmin} = req.body
const salt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash(password, salt)
const cloudy = await cloudinary.uploader.upload(req.file.path)

const user = await userModel.create({
    fullname, email, phone, password:hashed,isAdmin:true,
    avatar:cloudy.secure_url,
    avatarId:cloudy.public_id
})
        res.status(201).json({
            message:"all users",
            data:user 
         
        })
    } catch (error) {
        console.log(error)
    }
}

const siginUsers= async(req, res)=>{
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})
        if(user){
            const passcheck = await bcrypt.compare(password, user.password)
            if(passcheck){
                const token = jwt.sign({
                    _id:user._id
                },"thisisoja", {expiresIn:"30d"})
                const {password , ...info}=user._doc
                res.status(200).json({
                    message:"signedIn",
                    data:{token, ...info}
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    getallusers, 
    getoneusers,
    editoneusers,
    deleteoneusers,
    createoneusers,
    createoneadmin,
    siginUsers

}
