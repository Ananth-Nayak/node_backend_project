const mongoose=require('mongoose')
const Joi=require('joi')


const categoriesSchema= new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:30}   //scema
})

const Category= mongoose.model("Category",categoriesSchema)   //model


function validateData(category){
    const schema = {
       name: Joi.string().min(3).required()
    }

    return Joi.validate(category, schema)
}

exports.Category=Category
exports.categoriesSchema=categoriesSchema
exports.validate=validateData