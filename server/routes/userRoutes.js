const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const { passCheck } = require("../middleware/passCheck.middleware");
const { BlacklistModel } = require("../models/blacklistModel");
const { auth } = require("../middleware/auth.middleware");

/**
* @swagger
* components:
*   schemas:
*       User:
*           type: object
*           properties:
*               phone:
*                   type: number
*                   description: The phone number of the user
*               email:
*                   type: string
*                   description: The user email
*               password:
*                   type: string
*                   description: The user password
*/

const userRouter = express.Router();3


/**
* @swagger
* tags:
*   name: Users
*   description: All the API routes related to User
*/

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
                    res.status(201).send({"msg": "User registered successfuly", "user": user});
                }
            })
        }
    } catch (error) {
        res.status(400).send({"err": error})
    }
})

/**
* @swagger
* /user/register:
*   post:
*       summary: To post the details of a new user
*       description: The post the details of new user give the request body- phone number, email and password
*       tags: [Users]
*       requestBody:
*           required: true
*           content:                
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           201:
*               description: User registered successfuly
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               msg:
*                                   type: string
*                               user:
*                                   type: object
*           400:
*               description: Some server error
*/

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

/**
* @swagger
* /user/login:
*   post:
*       summary: To post the details of a existing user to log in
*       description: The login the user give the request body- email and password
*                    and recieve a access token 
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           email:
*                               type: string
*                           password:
*                               type: string
*       responses:
*           200:
*               description: Login successful
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               msg:
*                                   type: string
*                               token:
*                                   type: string
*           400:
*               description: Some server error
*/

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

/**
* @swagger
* /user/logout:
*   get:
*       summary: To log out the user
*       tags: [Users]
*       parameters:
*       -   name: authorization
*           in: header
*           description: an authorization token
*           required: false
*           type: string
*       responses:
*           200:
*               description: User has been logged out
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           400:
*               description: Some server error
*/

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

/**
 * @swagger
 * /user/change-password:
 *   patch:
 *     summary: Change user password
 *     parameters:
 *       name: authorization
 *       in: header
 *       description: an authorization token
 *       required: false
 *       type: string     
 *     tags: 
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - newPassword
 *     responses:
 *       '200':
 *         description: User password has been changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized - Invalid token
 *       '400':
 *         description: Bad request - Invalid request payload
 *       '404':
 *         description: User not found
 *    
*/

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
/**
* @swagger
* /user/delete:
*   delete:
*     summary: Delete user
*     tags:
*       - Users
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*             required:
*               - email
*               - password
*     responses:
*       '200':
*         description: User has been deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                   type: string
*       '404':
*         description: No user found
*       '400':
*         description: Bad request - Invalid request payload
*/



module.exports = {
    userRouter
}