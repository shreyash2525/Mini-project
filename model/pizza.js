const mongoose=require('mongoose')

const pizzaSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    description:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        //require:true
    },
    image:{
        type:String,
        //required:true
    }  
})

const Pizza = mongoose.model('Pizza',pizzaSchema)

module.exports = Pizza ;