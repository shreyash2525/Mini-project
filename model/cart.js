const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    qty:{
        type:Number,
        min:1
    },
    type:{
        type:String
    }
})

const Cart=mongoose.model('Cart' , cartSchema)

module.exports=Cart