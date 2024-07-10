import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';

// this page user to see the userBooking if user is owner to see all the booking of user
const MyBooking = () => {
  const { user } = useUserContext()//get the current user
  const [booking, setBooking] = useState([]);//state to store the booking
  const navigate=useNavigate()
  
  const getBooking = async () => {
    try {
      if (!user?.user?._id) {
        console.error('User ID is undefined');
        return;
      }
      const userId = user.user._id;
      //if the user is customer to get booking data particular user
      if(user?.user?.role==='Customer')
      {
      const res = await axios.post('http://localhost:4000/api/booking/getbyId', { userId });
      console.log(res.data + "rgtnhj")    
      //if is suceesfull
      if (res.data.success) {
        setBooking(res.data.data.book);
      }
    }
    else
    {
      //else if the user is Owner to get all the  booking data to store in booking hook
      const res = await axios.get('http://localhost:4000/api/booking/getbooking');
      console.log(res.data + "rgtnhj");
                             
      if (res.data.success) {
        setBooking(res.data.data.book);
      }
    }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  useEffect(() => {
    getBooking();
  }, [user]);

  return (
    <div className='h-screen pt-[16vh] py-2 px-3 sm:px-4 md:px-6 lg:px-10'>
      <div className='text-center text-xl lg:text-2xl'>My Booking</div>
      <div>
        {booking && booking.map(element => (
          <div key={element._id} className='mt-6 bg-white px-4 py-4 shadow-md rounded-2xl'>
            <span className='text-center text-xl text-red-300'>
              <div>Bike Service</div>
            </span>
            <div>
            <div className='flex justify-around text-xl mt-2 text-blue-400'>
              <span>Service</span>
              <span>Amount</span>
              <span>Date and Time</span>
            </div>
            {element.Items.map(val => (
              <div key={val._id} className='flex justify-around mt-1'>
                <div>
                  {val.service}
                </div>
                <div>
                  {val.amount}
                </div>
                <div>
                  {new Date(element.createdAt).toLocaleString()}
                </div>
                

              </div>
              
            ))}
          <div className='text-right me-5 pt-4'>
            <button onClick={()=>navigate('/status',{replace:true,state:{id:element._id}})} className='bg-blue-300 px-3 p-2 rounded-md shadow-xl active:scale-90'><Link to='/status'>check status</Link></button>
          </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
