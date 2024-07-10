import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/userContext'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Status = () => {
    const [booking,setBooking]=useState([])// State to store booking data
    const {user}=useUserContext()// Get the current user context
    const location=useLocation()
    const {id}=location.state;  //to get the id from booking component
    console.log(id)
    const updateStatus=async(id,status)=>{
      try{
         // if user email is available or not
        console.log(status)
      
      const res=await axios.put('http://localhost:4000/api/booking/update-status',{id,status}) //this is used to update the status for ready for delivery or completed
      if (res.data.success) {
          setBooking(res.data.data.book);
        }
      }
      catch(err)
      {
          console.log(err)
      }
  }
    const fetchBooking=async()=>{
        try {
          //check the user Id is available or not
            if (!user?.user?._id) {
              console.error('User ID is undefined');
              return;
            }
            
      if (!user.user.email) {
        console.error('email is undefined');
        return;
    }

    const email=user.user.email;
            const userId = user.user._id;
            //fetch booking data from server 
            const res = await axios.post('http://localhost:4000/api/booking/getBookingById', { id });//to fetch the booking from particular id
              
            console.log(res)   
            booking.map(e=>{
              e.Items.map(book=>{
                console.log(book)
                console.log(e.status)
              })
            })
             // If the fetch is successful, update the booking state        
            if (res.data.success) {
              setBooking(res.data.data.book);
            }
          } catch (error) {
            console.error('Error fetching bookings:', error);
          }
    }
    useEffect(()=>{
        fetchBooking() //to fetch the booking data
    },[updateStatus])
  
    
    
  return (
    <div className='h-screen pt-[16vh] py-3 px-10 sm:px-4 md:px-6 lg:px-10'>
            <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Booking List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-2 sm:px-4">Service Name</th>
              <th className="py-2 px-2 sm:px-4">service Amount</th>
              <th className="py-2 px-2 sm:px-4">Total Amount</th>
              <th className="py-2 px-2 sm:px-4">Date</th>
              <th className="py-2 px-2 sm:px-4">Status</th>
              {
                 user?.user?.role==='Owner'&&<th className="py-2 px-2 sm:px-4">Actions</th>
              } 
            </tr>
          </thead>
          <tbody>
            { booking.map(book=>(
            book.Items.map(booking=>(
              <tr key={booking._id} className="text-xs sm:text-base">
                <td className="border px-2 py-2 sm:px-4">{booking.service}</td>
                <td className="border px-2 py-2 sm:px-4">{booking.amount}</td>
                <td className="border px-2 py-2 sm:px-4">{book.totalAmount}</td>
                <td className="border px-2 py-2 sm:px-4">{book.date}</td>
                <td className="border px-2 py-2 sm:px-4">
                  <span
                      className={`px-2 py-1 rounded ${
                      booking.status === 'pending' ? 'bg-yellow-200 text-yellow-800':
                      booking.status === 'ready for delivery' ? 'bg-blue-200 text-blue-800':
                      'bg-green-200 text-green-800'
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                {
                  user?.user?.role==='Owner'&&
                <td className="border px-2 py-2 sm:px-4">
                  <button
                    onClick={() => updateStatus(book._id,'ready for delivery')}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-1 sm:mr-2 active:scale-90"
                  >
                    Mark as Ready
                  </button>
                  <button
                    onClick={() => updateStatus(book._id,'completed')}
                    className="bg-green-500 text-white px-2 py-1 rounded active:scale-90"
                  >
                    Mark as Completed
                  </button>
                </td>
                }
              </tr>
            ))))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Status