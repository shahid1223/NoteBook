const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')

router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some error accured")
    }
})
router.post('/addnote',fetchuser,[
    body('title','Enter a title').isLength({ min: 3 }),
    body('describtion','Enter a describtionl').isLength({ min: 5 }),
    body('tag','tag').isLength({ min: 3 }),
], async (req,res)=>{
    try {
    const {title,describtion,tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
     
    let notes = await Notes.create({
        // title: req.body.title,
        // describtion: req.body.describtion,
        // tag: req.body.tag,
        // user: req.user.id
        title,describtion,tag,user:req.user.id
      })
      const savednotes = await notes.save()
    res.json(savednotes)         
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error accured")
    }
})

//Route numberr 3

router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const {title,describtion,tag} = req.body;
    try {
    const newNote = {};
    if(title){
        newNote.title = title;
    }
    if(describtion){
        newNote.describtion = describtion;
    }
    if(tag){
        newNote.tag = tag;
    }

    let note = Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note Found")}
    if(note.user !== req.user.id ){
        return res.status(404).send("Not Allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
    res.json({note})
            
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error accured") 
    }
})

//Route numberr 4

router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
    let note = Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note Found")}
    if(note.user !== req.user.id ){
        return res.status(404).send("Not Allowed")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({message:"Success Note Deleted", note: note})
            
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error accured") 
    }
})
module.exports = router