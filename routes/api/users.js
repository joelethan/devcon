import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
const passport = require('passport')

dotenv.config();

const router = express.Router();

// Load Input validations
const validateRegisterInput = require('../../validation/register');

// Check for validation errors
if(!isValid){
    return res.status(400).json(errors);
}

const User = require('../../models/User');

router.get('/', (req, res) => res.json({msg: "Users works"}));

// User registration
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    User.findOne({email: req.body.email})
        .then(user =>{
            if(user) return res.status(400).json({email: "Email already exists"});
            
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Dafault
            });
            
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    });
                });
            });
        });

router.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            // Check for user
            if(!user) return res.status(404).json({User: "User not found"});

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // jwt payload
                        const payload = {
                            id: user.id, name: user.name, avatar: user.avatar
                        }
                        // Generate token
                        jwt.sign(payload, process.env.secret, {expiresIn: 3600}, (err, token)=>{
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            })
                        });
                    } else{
                        return res.status(404).json({User: "User not found"});
                    }
                });
        });
});

// Protected route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        date: req.user.date
    });
});

module.exports = router;
