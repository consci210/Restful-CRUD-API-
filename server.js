const express = require('express')
const mongoose = require('mongoose')


const app = express()



// routes 
app.get('/' , (req , res) => {
    res.send("Greetings from Node JS ...server listening on port 3000 ")
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