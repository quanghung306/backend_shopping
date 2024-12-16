const express = require("express");
const router =express.Router();
const cloudinary= require("../utils/cloudinary");
const { product } = require("../models/product");
const {isAdmin} =require("../middleware/auth")
//createProduct
router.post("/",isAdmin,async(req,res)=>{
    const {title,category,gender,description,image,price} =req.body;
    try {
        if (image) {
            const uploadRes= await cloudinary.uploader.upload(image,{
                upload_preset:"nike_Shop"
            })
            if (uploadRes) {
                const products =new product({
                    title,
                    category,
                    gender,
                    description,
                    image:uploadRes,
                    price,
                })
                const saveProduct= await products.save()
                res.status(200).send(saveProduct);
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
        
    }

});
router.get("/", async(req,res)=>{
    try {
        const products =await product.find()
    res.status(200).send(products)
    } catch (error) {
        console.log(e);
        res.status(500).send(e)
        
    }
})
module.exports =router