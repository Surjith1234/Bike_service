const express=require('express')
const ExpressFormidable = require('express-formidable')
const router=express.Router()
//import function from Image controller
const {imageUploadController} =require("../controllers/Image")

router.post("/upload-image",ExpressFormidable({maxFieldsSize:5*2024*2024}),imageUploadController
)//POST requests to '/upload-image' and uses the mageUploadController controller function
module.exports=router;