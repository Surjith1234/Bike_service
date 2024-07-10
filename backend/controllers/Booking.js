
const booking = require('../model/Booking');
const nodemailer = require('nodemailer');
const User=require('../model/User')
//function to send email
const sendEmail=(subject,text,mail) => {
  console.log(subject)
  const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gokulsurjith@gmail.com',
      pass: 'gmjd ntjn xznq xdrq' 
    }
  });
  const mailOptions = {
    from: 'gokulsurjith@gmail.com',
    to: mail,
    subject: subject,
    text: text
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const createBooking = async (req, res) => {
  try {

    console.log(req.body);
    const { userId, email, Items, date, totalAmount } = req.body;

  // Log the incoming request data
  console.log('Incoming booking request:', { userId, email, Items, date, totalAmount });
    
   //to store the booking data into the database
    const book = await booking.create(req.body);
    console.log(req.body.email)
    console.log(book)
    if (book) {  //to call a send mail function
      sendEmail(
        'New Booking Created',
        `A new booking has been created with the following details:\n\n${Items.map(item => `Service: ${item.service}, Amount: ${item.amount}`).join("\n")}`,
        req.body.email
      );
      //send response to frontend
      return res.status(201).send({ success: true, message: "Booking successfully created" });
    } else {
      return res.status(500).send({ success: false, message: "Booking problem" });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};
const getBooking = async (req, res) => {
  try {
    //to get all the booking data
    const book = await booking.find();
    if (book) {
      return res.status(201).send({ success: true, data: { book } });
    } else {
      return res.status(500).send({ success: false, message: "Fetching problem" });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

const getBookingById = async (req, res) => {
  try {
    //to get booking data for particular useid
    const book = await booking.find({ userId: req.body.userId });
    if (book) {
      return res.status(201).send({ success: true, data: { book } });
    } else {
      return res.status(500).send({ success: false, message: "Server problem" });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "Server problem" });
  }
};

const getById = async (req, res) => { //to get booking data for particular id
  try {
    const book = await booking.find({ _id: req.body.id });
    if (book) {
      return res.status(201).send({ success: true, data: { book } });
    } else {
      return res.status(500).send({ success: false, message: "Server problem" });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "Server problem" });
  }
};

const updateStatus = async (req,res)=>{
  try {
    //to update the status for 'pending','ready for delivery','completed'
    console.log(req.body)
    const book = await booking.updateOne({_id:req.body.id},{$set:{status: req.body.status}});
    console.log(book)
    if (!book) {
      return res.status(404).send({ success: false, message: "Booking not found" });
    }
    // Fetch user details associated with the booking
    const user=await User.find(book.userId)
   
      //if the bike is ready for delivery to send a email to user
      if(req.body.status==='ready for delivery' && user && user.email)
        {//to call a sendmail function
          sendEmail(
            'Booking Status Updated',
            `The status of booking with ID ${req.body.id} has been updated to ${req.body.status}.`,
            user.email
          );
      return res.status(201).send({success: true, data:{book}});
    } else {
      return res.status(500).send({ success: false, message: "Server problem" });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: "Server problem" });
  }
};


 //to export all the function
module.exports = {createBooking,getBooking,getBookingById,getById,updateStatus};
