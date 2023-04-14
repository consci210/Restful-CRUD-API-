const express = require('express')
const mongoose = require('mongoose')
const Customer = require('./models/customerModel')


const app = express()
app.use(express.json())

   
    
    


   
// GET requests 
// Go to homepage 
app.get('/' , (req , res) => {
    res.send("Greetings from Node JS ...server listening on port 3000 ")
})

 // Get all customers   
app.get('/customers' , async(req,res) =>{
    try{
       
        const customers = await Customer.find({})  
        res.status(200).json(customers)
    }catch(err){
        console.log(err.message)
        res.status(500).json({message : err.message })
    }
})

// Get a specific customer  

app.get('/customers/:id' , async(req,res) => {
    try{
        const {id} = req.params 
        const customer = await Customer.findById(id)
        res.status(200).json(customer) 
    }catch(err){
        console.log(err.message)
        res.status(500).json({message : err.message })
    }
})




// POST request
app.post('/customer' , async(req , res) => {
    try{
        const customer = await Customer.create(req.body)
        res.status(200).json(customer)

    }catch(err){
        console.log(err)
        res.status(500).json({message : err.message })
    }
    
})



mongoose.set("strictQuery" , false )
mongoose
.connect('mongodb+srv://admin:admin@restapi.a5y36u3.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000 , ()=>{
        console.log('App is running on port 3000')
    })
    console.log('Connected to Mongo DB') 
}).catch( (err) => {
    console.log(err)
})