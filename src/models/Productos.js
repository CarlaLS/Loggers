const {Schema, model} = require('mongoose')


const productSchema=new Schema({

    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true

    },
  




})
module.exports = model('Productos', productSchema)