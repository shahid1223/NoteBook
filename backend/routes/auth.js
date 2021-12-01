const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "shahidisagoodboy"


//Creat a User Using: POST "/api/auth"
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password Must be at least 5 charecter').isLength({ min: 5 }),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
    let ser = await User.findOne({email: req.body.email});
    if(ser){
        return res.status(400).json({error:"Sorry a user with this email is already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPas = await bcrypt.hash(req.body.password , salt)
 
    let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPas,
      })
    const data = {
        user:{
            id:User.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})
    res.json(user)
}catch(error){
    console.error(error.message);
    res.status(500).send("Some error accured")
}
})
// creating a login endpoint 
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email , password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.json({error:"Try to login with correct credentials"});
        }
        const passwodcampare = await bcrypt.compare(password,user.password)
        if(!passwodcampare){
            return res.status(400).json({error:"Try to login with correct credentials"});
        }
        const data = {
            user:{
                id:User.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})

//Route: 3 Get lloggedin user details using Post login required 
router.post('/getuser', fetchuser ,async (req,res)=>{
try {
    userId = req.user.id
    const user = await User.findById(userId).select("password")
    res.send(user + "Hello")
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error")
}
})
module.exports = router