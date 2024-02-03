const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklistModel");

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if(token){
            const blacklist = await BlacklistModel.findOne({token});
            if(blacklist){
                res.status(400).send({"err": "Token expired! Please login again"});
            }else{
                jwt.verify(token, "myntra", (err, decoded) => {
                    if(decoded){
                        next();
                    }else{
                        res.status(400).send({"err": "Please login again"});
                    }
                })
            }
        }else{
            res.status(400).send({"err": "No token found"});
        }
    } catch (error) {
        res.status(400).send({"err": error});
    }
};

module.exports = {
    auth
}