const express=require('express')
const {Category, validate}=require('../models(DataBase)/categoriesModel')
const router=express.Router()



router.get("/", async (req,res)=>{
    let categories=await Category.find()                  //to get data
    res.send(categories)
})

router.post("/",async (req,res)=>{

    const {error}=validate(req.body)
    if(error) 
    return res.status(404).send(error.details[0].message)
    const category=new Category({                                         //using model to create data as a document
        name:req.body.name
    })
    const result=await category.save()
    res.send(result)
})

router.put("/:id", async (req,res)=>{

    const {error}=validate(req.body)
    if(error)
    return res.status(404).send(error.details[0].message)

    const category=await Category.findByIdAndUpdate(req.params.id,{name:req.body.name},{new : true})
    if(!category)
    return res.status(404).send("The category with given id was not found")

    res.send(category)

})

router.delete("/:id",async (req,res)=>{
    const category=await Category.findByIdAndRemove(req.params.id)
    if(!category)
    return res.status(404).send("The category with given id was not found")

    res.send(category)
})

router.get("/:id",async (req,res)=>{
    const category=await Category.findById(req.params.id)
    if(!category)
    return res.status(404).send("The category with given id was not found")

    res.send(category)
})


module.exports= router          