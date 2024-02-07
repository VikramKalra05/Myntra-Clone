const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { MensModel } = require("../models/mensModel");
const { WomenModel } = require("../models/womenModel");
const { KidsModel } = require("../models/kidsModel");

const productRoutes = express.Router();

productRoutes.get("/men", auth, async (req, res) => {
    const { filter, sort } = req.query;
    try {
        const mensClothes = await MensModel.find({filter});
        res.status(200).send({"mens": mensClothes});
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

productRoutes.get("/women", auth, async (req, res) => {
    const { filter, sort } = req.query;
    try {
        const womenClothes = await WomenModel.find({filter});
        res.status(200).send({"womens": womenClothes});
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

productRoutes.get("/kids", auth, async (req, res) => {
    const { filter, sort } = req.query;
    try {
        const kidsClothes = await KidsModel.find({filter});
        res.status(200).send({"kids": kidsClothes});
    } catch (error) {
        res.status(400).send({"err": error});
    }
});

module.exports = {
    productRoutes
}