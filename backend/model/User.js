const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"This is a required option"]
    },
    number:{
        type:Number,
        required:[true,"This is a required option"]
    },
    email:{
        type:String,
        required:[true,"This is a required option"]
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
    },
    role:{
        type:String,
        required:[true,"This is a required option"]
    },
    Image:{
        type:String
    }
},{timestamps:true})


module.exports=mongoose.model('user',userSchema)