const express=require('express')
const {Course, validate}=require('../models(DataBase)/courseModel')
const {Category}= require('../models(DataBase)/categoriesModel')
const router=express.Router()

router.get("/",async (req,res)=>{
    const courses= await Course.find()
    res.send(courses)
})

router.post("/",async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
    return res.status(404).send(error.details[0].message);

    const category=await Category.findById(req.body.categoryId)
    if(!category)
    return res.status(404).send("Invalid ID")

    let course=new Course({
        title:req.body.title,
        category:{
            _id:category._id,
            name:category.name
        },
        creator:req.body.creator,
        rating:request.body.rating
    })

    course= await course.save();

    res.send(course)
})

router.put("/:id",async (req,res)=>{
    
    const {error}=validate(req.body)
    if(error)
    return res.status(404).send(error.details[0].message);

    const category=await Category.findById(req.body.categoryId)
    if(!category)
    return res.status(404).send("Invalid ID")


    const course=await Course.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        category:{
            _id:category._id,
            name:category.name
        },
        creator:req.body.creator,
        rating:req.body.rating
    },{new:true})

    if(!course)
    return res.status(404).send("the course youn are lookong for does not exist ")

    res.send(course)

})

router.delete("/:id",async (req,res)=>{
    const course=await Course.findByIdAndRemove(req.params.id)

    if(!course)
    return res.status(404).send("the course id is incorrect")

    res.send(course)
})

router.get("/:id",async (req,res)=>{
    const course=await Course.findById(req.params.id)

    if(!course)
    return res.status(404).send("the course you are lookin for does not exist")

    res.send(course)
})

module.exports=router
