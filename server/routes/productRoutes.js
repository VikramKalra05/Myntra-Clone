const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { MensModel } = require("../models/mensModel");
const { WomenModel } = require("../models/womenModel");
const { KidsModel } = require("../models/kidsModel");

const productRoutes = express.Router();

productRoutes.get("/men", auth, async (req, res) => {
    const { filter, sort } = req.query;
    try {
        const mensClothes = await MensModel.find({filter}).sort(sort);
        res.status(200).send({"mens": mensClothes});
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

productRoutes.get("/men/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const mensClothes = await MensModel.findOne({_id: id});
        if(mensClothes){
            res.status(200).send({"mens": mensClothes});
        }else{
            res.status(200).send({"msg": "No Cloth found"});
        }
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

productRoutes.get("/women", auth, async (req, res) => {
    const { filter, sort } = req.query;
    try {
        const womenClothes = await WomenModel.find({filter}).sort(sort);
        res.status(200).send({"womens": womenClothes});
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

productRoutes.get("/women/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const womenClothes = await WomenModel.findOne({_id: id});
        if(womenClothes){
            res.status(200).send({"womens": womenClothes});
        }else{
            res.status(200).send({"msg": "No Cloth found"});
        }
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

productRoutes.get("/kids", auth, async (req, res) => {
    const { filter, sort } = req.query;

    try {
        const kidsClothes = await KidsModel.find({filter}).sort(sort);
        res.status(200).send({"kids": kidsClothes});
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

productRoutes.get("/kids/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        const kidsClothes = await KidsModel.findOne({_id: id});
        if(kidsClothes){
            res.status(200).send({"kids": kidsClothes});
        }else{
            res.status(200).send({"msg": "No Cloth found"});
        }
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

module.exports = {
    productRoutes
}