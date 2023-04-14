const mongoose = require('mongoose')


const customerSchema = mongoose.Schema(
    {
        name : {
            type : String ,
            required : [true , "Please enter a customer Name "],
        } , 

        age : {
            type : Number ,
            required : [true , 'Please enter customer Age'] ,
            default : 18 ,

        } , 
        city : {
            type : String ,
            required : [true , "Please enter city name "],
        } , 
        image :{
            type : String , 
            required : false 
        },
    },{
        timestamps : true  
    }
)


const Customer = mongoose.model('Customer' ,customerSchema);

module.exports = Customer ;