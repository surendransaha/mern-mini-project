// import express package
const express = require('express');
const mongoose = require('mongoose');

//get express instance
const app = express();
app.use(express.json())
app.use(express.urlencoded())

//db connect
mongoose.connect('mongodb://0.0.0.0:27017/mern-app')
.then(()=>{
console.log('Mongo DB Connected')
})
.catch((err)=>{
console.log(err)
})

//create schema
const toDoSchema = new mongoose.Schema(
{
    title: {
        required: true, 
        type: String,
        unique: true
    }
});

toDoSchema.index({ title: 1 }, { unique: true });

//create Model
const toDoModel = mongoose.model('Todo', toDoSchema)


//create rought
app.get('/', (req, res)=>{
    res.send('hello word')
})



//add todo
app.post('/todos', async (req, res)=>{
    const {title} = req.body

    try {

        const newTodo = toDoModel({title})
        await newTodo.save();
        res.status(201).json(newTodo)
        
    } catch (error) {
      res.status(501).json({message: error})   
    }


})

//get todo
app.get('/todos', async (req, res)=>{
    try {
        const result = await toDoModel.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(501).json({message: error}) 
    }
})

//update
app.put('/todos/:id', async (req, res) => {

    try{
        const { id } =  req.params
        const { title } = req.body
        const result = await toDoModel.findByIdAndUpdate(id, { title }, { new: true} )
        console.log(result)
        res.status(200).json(result)
    }catch(err){
        res.status(501).json({message: err}) 
    }

})

//delete
app.delete('/todos/:id',  async(req,res)=>{
 
    try {
        const { id } = req.params
        await toDoModel.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        res.send(501).json({message: error})
    }
})


//server runinig
const port = 4000
app.listen(port, ()=> {
    console.log(`${port} running!`)
})