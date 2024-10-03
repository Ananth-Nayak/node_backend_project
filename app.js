const express=require('express')
const mongoose=require('mongoose')

const categories=require('./routes/categories')
const students=require('./routes/students')
const courses=require('./routes/course')

const app=express()

mongoose.connect("mongodb://localhost/learningPlatform")
.then(()=>console.log("Connection is Succesful to database"))
.catch(()=>console.error("Could Not connect to mongodb"))

app.use(express.json())
app.use("/api/categories",categories)
app.use("/api/students",students)


const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`The app is running on ${port}`))