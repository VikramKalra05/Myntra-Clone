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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints related to products
 * 
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         discount:
 *           type: string
 *           description: The discount percentage
 *         discounted_price:
 *           type: string
 *           description: The discounted price of the product
 *         id:
 *           type: string
 *           description: The ID of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         rating:
 *           type: string
 *           description: The rating of the product
 *         rating_count:
 *           type: string
 *           description: The count of ratings
 *         size:
 *           type: array
 *           items:
 *             type: string
 *           description: Available sizes of the product
 *         strike_price:
 *           type: string
 *           description: The strike price of the product
 *         title:
 *           type: string
 *           description: The title of the product
 */

/**
 * @swagger
 * /products/men:
 *   get:
 *     summary: Get men's clothing
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter for men's clothing
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort parameter for men's clothing
 *     responses:
 *       '200':
 *         description: A list of men's clothing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mens:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /products/men/{id}:
 *   get:
 *     summary: Get a men's clothing item by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the men's clothing item to retrieve
 *     responses:
 *       '200':
 *         description: A men's clothing item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Men's clothing item not found
 */

/**
 * @swagger
 * /products/women:
 *   get:
 *     summary: Get women's clothing
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter for women's clothing
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort parameter for women's clothing
 *     responses:
 *       '200':
 *         description: A list of women's clothing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 womens:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /products/women/{id}:
 *   get:
 *     summary: Get a women's clothing item by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the women's clothing item to retrieve
 *     responses:
 *       '200':
 *         description: A women's clothing item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Women's clothing item not found
 */

/**
 * @swagger
 * /products/kids:
 *   get:
 *     summary: Get kids' clothing
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter for kids' clothing
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort parameter for kids' clothing
 *     responses:
 *       '200':
 *         description: A list of kids' clothing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kids:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /products/kids/{id}:
 *   get:
 *     summary: Get a kids' clothing item by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the kids' clothing item to retrieve
 *     responses:
 *       '200':
 *         description: A kids' clothing item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Kids' clothing item not found
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     KidsModel:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         discount:
 *           type: string
 *           description: The discount percentage
 *         discounted_price:
 *           type: string
 *           description: The discounted price of the product
 *         id:
 *           type: string
 *           description: The ID of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         rating:
 *           type: string
 *           description: The rating of the product
 *         rating_count:
 *           type: string
 *           description: The count of ratings
 *         size:
 *           type: array
 *           items:
 *             type: string
 *           description: Available sizes of the product
 *         strike_price:
 *           type: string
 *           description: The strike price of the product
 *         title:
 *           type: string
 *           description: The title of the product
 *     MensModel:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         discount:
 *           type: string
 *           description: The discount percentage
 *         discounted_price:
 *           type: string
 *           description: The discounted price of the product
 *         id:
 *           type: string
 *           description: The ID of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         rating:
 *           type: string
 *           description: The rating of the product
 *         rating_count:
 *           type: string
 *           description: The count of ratings
 *         strike_price:
 *           type: string
 *           description: The strike price of the product
 *         size:
 *           type: array
 *           items:
 *             type: string
 *           description: Available sizes of the product
 *     WomenModel:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         discount:
 *           type: string
 *           description: The discount percentage
 *         discounted_price:
 *           type: string
 *           description: The discounted price of the product
 *         id:
 *           type: string
 *           description: The ID of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         rating:
 *           type: string
 *           description: The rating of the product
 *         rating_count:
 *           type: string
 *           description: The count of ratings
 *         size:
 *           type: array
 *           items:
 *             type: string
 *           description: Available sizes of the product
 *         strike_price:
 *           type: string
 *           description: The strike price of the product
 *         title:
 *           type: string
 *           description: The title of the product
 */
