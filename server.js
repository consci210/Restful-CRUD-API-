const express = require('express')
const mongoose = require('mongoose')
const Customer = require('./models/customerModel')
const config = require('./config')


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false }))
   
    

// Connect to Database 
mongoose.set("strictQuery" , false )
mongoose
.connect(config.mongoURI, { useNewUrlParser: true })
.then(() => {
    app.listen(3000 , ()=>{
        console.log('App is running on port 3000')
    })
    console.log('Connected to Mongo DB') 
}).catch( (err) => {
    console.log(err)
})
    


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
// Create a customer 
app.post('/customer' , async(req , res) => {
    try{
        const customer = await Customer.create(req.body)
        res.status(200).json(customer)

    }catch(err){
        console.log(err)
        res.status(500).json({message : err.message })
    }
    
})



// PUT request 
// Edit a customer 
app.put('/customers/:id' , async(req,res) => {
    try{
        const {id} = req.params 
        const customer = await Customer.findByIdAndUpdate(id , req.body) 
        if(!customer){
            return res.status(404).json({message : `Couldn't update the customer with id  ${id} becuase it doesnt exist in database ` })
        }
        const updatedCustomer = await Customer.findById(id)  
        res.status(200).json(updatedCustomer) 
    }catch(err){
        console.log(err.message)
        res.status(500).json({message : err.message })
    }
})



// DELETE request 
// Remove a customer 
app.delete('/customers/:id' , async(req,res) => {
    try{
        const {id} = req.params 
        const customer = await Customer.findByIdAndDelete(id) 
        if(!customer){
            return res.status(404).json({message : `Couldn't delete the customer with id  ${id} becuase it doesnt exist in database ` })
        }
        res.status(200).json(customer) 
    }catch(err){
        console.log(err.message)
        res.status(500).json({message : err.message })
    }
})


