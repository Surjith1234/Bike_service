const mongoose=require('mongoose')

const serviceSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true})



module.exports=mongoose.model('service',serviceSchema)