const express=require('express')
//import function from service controller function
const { createService, getService,getById, findAndUpdate, deleteService } = require('../controllers/Service')

const router=express.Router()

router.post('/addservice',createService)//POST requests to '/addservice' and uses the createService controller function
router.get('/getService',getService)//GET requests to '/getService' and uses the getService controller function
router.post('/getById',getById)//POST requests to '/getById' and uses the getById controller function
router.put('/update-service',findAndUpdate)//PUT requests to '/update-service' and uses the findAndUpdate controller function
router.delete('/delete-service',deleteService)//DELETE requests to '/delete-service' and uses the deleteService controller function
module.exports=router