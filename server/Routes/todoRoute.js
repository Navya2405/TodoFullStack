const router = require('express').Router();
const todoModel = require('../models/todos');
const {verifyToken} = require("../Heplers/Helpers");

 
router.post('/addTodo',verifyToken, async (req, res)=>{
    let reqObj=req.body
    try{
        const newItem = new todoModel(reqObj)
        const resp = await newItem.save()
        res.status(200).json({response:resp,"insertedData":reqObj});
    }catch(err){
        res.json(err);
    }
})
router.post('/updateTodo', verifyToken,async (req, res)=>{
    let reqObj=req.body
    try{
        const resp = await todoModel.findByIdAndUpdate(reqObj._id, {$set: reqObj});
        res.status(200).json(resp);
    }catch(err){
        res.json(err);
    }
})
router.post('/deleteTodo',verifyToken, async (req, res)=>{
    let reqObj=req.body
    try{
        const resp=  await todoModel.findByIdAndDelete(reqObj._id);
        res.status(200).json(resp);
    }catch(err){
        res.json(err);
    }
})
router.post('/getTodos',verifyToken, async (req, res)=>{
    console.log("getTodos==>");
    try{
        const resp = await todoModel.find({});
        res.status(200).json(resp)
    }catch(err){
        res.json(err);
    }
})
module.exports = router;