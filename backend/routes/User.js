const express=require('express')
//import function from user controllers function
const { register, login, authController } = require('../controllers/User')
const protect=require('../middleware/Middleware')
const router=express.Router()
router.post('/register',register)//POST requests to '/register' and uses the register controller function
router.post('/login',login)//POST requests to '/login' and uses the login controller function
router.post('/get-user',protect,authController)//POST requests to '/get-user' and uses the uthController controller function
module.exports=router//export the router