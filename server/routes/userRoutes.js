const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const { passCheck } = require("../middleware/passCheck.middleware");
const { BlacklistModel } = require("../models/blacklistModel");
const { auth } = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.post("/register", passCheck, async (req, res) => {
    const {phone, email, password} = req.body;
    try {
        const isUser = await UserModel.findOne({email});
        if(isUser){
            res.status(200).send({"msg": "User already exists"});
        }else{
            bcrypt.hash(password, 8, async (err, hash) => {
                if(err){
                    res.status(200).send({"err": "Something went wrong while hashing"});
                }else{
                    const user = new UserModel({email, phone, password: hash});
                    await user.save();
                    res.status(200).send({"msg": "User registered successfuly", "user": user});
                }
            })
        }
    } catch (error) {
        res.status(400).send({"err": error})
    }
})

userRouter.post("/login", async (req, res) => {
    const {phone, email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, hash) => {
                if(hash){
                    const token = jwt.sign({user: user}, "myntra", { expiresIn: "5hr"});
                    res.status(200).send({
                        "msg": "Login successful",
                        "token": token
                    });
                }else{
                    res.status(200).send({"msg": "Wrong Password"});
                }
            })
        }else{
            res.status(200).send({"msg": "No user found"});
        }
    } catch (error) {
        res.status(400).send({"err": error})
    }
});

userRouter.get("/logout", auth, async (req, res) => {
    const token = req.headers.authorization;
    try {
        if(token){
            const blacklist = new BlacklistModel({token});
            await blacklist.save();
            res.status(200).send({"msg": "User has been logged out"});
        }else{
            res.status(400).send({"err": "Give a token to logout"});
        }
    } catch (error) {
        res.status(400).send({"err": error})
    }
})

userRouter.patch("/change-password", [auth, passCheck], async (req, res) => {
    const { email, password, newPassword } = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, async (err, hash) => {
                if(hash){
                    bcrypt.hash(newPassword, 8, async (err, hash) => {
                        if(err){
                            res.status(200).send({"err": "Something went wrong while hashing"});
                        }else{
                            const newUser = await UserModel.findByIdAndUpdate({_id: user._id}, {password: hash});
                            res.status(200).send({"msg": "User has been updated", "user": newUser});
                        }
                    })
                }else{
                    res.status(200).send({"msg": "Wrong Password"});
                }
            })
        }else{
            res.status(200).send({"msg": "No user found"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({"err": error})
    }
});

userRouter.delete("/delete", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, async (err, hash) => {
                if(hash){
                    await UserModel.findByIdAndDelete({_id: user._id});
                    res.status(200).send({"msg": "User has been deleted"});
                }else{
                    res.status(200).send({"msg": "Wrong Password"});
                }
            })
        }else{
            res.status(200).send({"msg": "No user found"});
        }
    } catch (error) {
        res.status(400).send({"err": error})
    }
});

module.exports = {
    userRouter
}