const express=require('express')
// import the function from booking controller
const { createBooking, getBooking, getBookingById, getById, updateStatus } = require('../controllers/Booking')
const router=express.Router()

router.post('/newbooking',createBooking)//POST requests to '/newbooking' and uses the createBooking controller function
router.post('/getbyId',getBookingById)//POST requests to '/getbyId' and uses the getBookingById controller function
router.get('/getbooking',getBooking)//GET requests to '/getbooking' and uses the getBooking controller function
router.post('/getBookingById',getById)//POST requests to '/getBookingById' and uses the getById controller function
router.put('/update-status',updateStatus)//PUT requests to '/update-status' and uses the updateStatus controller function
module.exports=router; //to export the router