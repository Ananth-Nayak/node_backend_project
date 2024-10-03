const express=require('express')
const {Student, vaildate}=require('../models(DataBase)/studentsModel')
const router=express.Router()



router.get("/",async (req,res)=>{
    let students=await Student.find()
    
    res.send(students);
})

router.post("/",async (req,res)=>{

    const {error}=validate(req.body)
    if(error)
    return res.status(404).send(error.details[0].message)

    const student=new Student({
        name:req.body.name,
        isenrolled:req.body.isenrolled,
        phone:req.body.phone
    })

    const result=await student.save()
    res.send(result)
})

router.put("/:id",async (req,res)=>{

    const {error}=validate(req.body)
    if(error)
    return res.status(404).send(error.details[0].message)

    const student=await Student.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        isenrolled:req.body.isenrolled,
        phone:req.body.phone
    },{new:true})

    if(!student)
    return res.status(404).send("The Student id is incorrect")

    res.send(student)
})

router.delete("/:id",async (req,res)=>{
    const student=await Student.findByIdAndRemove(req.params.id)

    if(!student)
    return res.status(404).send("the student id is incorrect")

    res.send(student)
})

router.get("/:id",async (req,res)=>{
    const student=await Student.findById(req.params.id)

    if(!student)
    return res.status(404).send("the student you are lookin for does not exist")

    res.send(student)
})



module.exports=router