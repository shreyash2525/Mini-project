const express=require('express')
const app=express()
const path=require('path')
const mongoose = require('mongoose');
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')

const Pizza=require('./model/pizza')
const Cart=require('./model/cart')


mongoose.connect('mongodb://localhost:27017/pizza' , {useNewUrlParser:true , useUnifiedTopology:true} )
    .then( ()=>{
        console.log("Mongo Connection Open::")
    })
    .catch((err)=>{
        console.log("Mongo Bad Connection :( ")
        console.log(err)
    })


app.engine('ejs', ejsMate)
app.set("views", path.join(__dirname , "views"))
app.set("view engine" , "ejs")

app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))    



app.get('/pizzas' , async(req,res)=>{
    const pizzas = await Pizza.find({})
    res.render('home.ejs' , {pizzas})
})



app.get('/pizzas/cart' , async(req,res)=>{
    const items=await Cart.find({})
    res.render("cartIndex.ejs",{ items})
    
})

app.get('/pizzas/veg' , async(req,res)=>{
    const vegPizzas=await Pizza.find({type:'veg'})
    res.render('veg.ejs' , {vegPizzas})
})

app.get('/pizzas/nonveg' , async(req,res)=>{
    const nonVegPizzas=await Pizza.find({type:'nonveg'})
    res.render('nonveg.ejs' , {nonVegPizzas})
})

app.get('/pizzas/checkout' , async(req,res)=>{
    const cart=await Cart.find({})
    res.render('checkout.ejs' , {cart})
})

app.get('/pizzas/:id' , async(req,res)=>{
    const { id }=req.params
    const pizza=await Pizza.findById(id)
    res.render('show.ejs',{pizza})
})



app.get('/pizzas/:id/cart' , async(req,res)=>{
    const { id }=req.params
    const pizza=await Pizza.findById(id)
    const cart=await Cart.insertMany({name:pizza.name , price:pizza.price , type:pizza.type})
    //const items=await Cart.find({})
    res.redirect('/pizzas/cart')
    //await cart.save()
   // res.render("cartIndex.ejs",{cart, items})
})

app.delete('/pizzas/:id/cart' , async(req,res)=>{
    const { id }=req.params
    await Cart.findByIdAndDelete(id)
    res.redirect(`/pizzas/cart`)
})







app.listen(3000 , ()=>{
    console.log("Listening on port 3000: ")
})