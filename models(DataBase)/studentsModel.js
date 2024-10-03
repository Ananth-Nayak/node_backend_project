const mongoose=require('mongoose')
const Joi=require('joi')


const studentSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:30},
    
    isenrolled:{
        type:Boolean,
        default:false
    },

    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:12
    }
})

const Student= mongoose.model('Student',studentSchema)


function validateData(student){
    const schema={
        name:Joi.string().min(3).max(50).required,
        phone:Joi.string().min(10).max(12).required,
        isenrolled:Joi.boolean()
    }

    return Joi.validate(student,schema)
}

exports.Student=Student
exports.vaildate=validateData