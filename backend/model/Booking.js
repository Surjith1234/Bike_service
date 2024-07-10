const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Items:[
        {
           service:{
            type:String,
            required:true
           },
           amount:{
            type:Number,
            required:true
           }
        }
    ],
    date:{
        type:Date,
        required:true
    },
    status: {
        type: String,
        enum: ['pending','ready for delivery','completed'],
        default:'pending'
      },
    totalAmount:{
        type:Number,
        required:true
    }
},{timestamps:true})


module.exports=mongoose.model('booking',bookingSchema)