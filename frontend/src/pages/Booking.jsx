

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const { cartItems, removeToCart } = useCartContext(); // get the cart items user selected
  const { user } = useUserContext(); // get the current user
  const [date, setDate] = useState(); // state to store the date
  const navigate = useNavigate();

  const booking = async () => {
    try {
      let totalAmount = 0;
      cartItems.forEach(val => totalAmount += val.amount); // to calculate the total amount
      console.log(totalAmount);

      const Items = cartItems.map(item => ({
        service: item.service,
        amount: item.amount
      }));

      // if user id is available or not
      if (!user.user._id) {
        console.error('User ID is undefined');
        return;
      }
      // if user email is available or not
      if (!user.user.email) {
        console.error('Email is undefined');
        return;
      }

      const userId = user.user._id;
      const email = user.user.email;

      // to book the service
      const res = await axios.post('http://localhost:4000/api/booking/newbooking', {
        userId,
        email,
        Items,
        date,
        totalAmount
      });
      console.log(res)

      // if booking is successful
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        toast.error(res.data.message || 'Booking failed');
      }
    } catch (err) {
      console.log('Error during booking:', err);
      toast.error('An error occurred during booking');
    }
  };

  return (
    <div className="overflow-x-auto h-screen pt-[16vh] py-3 px-10 sm:px-4 md:px-6 lg:px-10">
      <table className="table">
        <thead>
          <tr className='text-xl'>
            <th></th>
            <th>Service Name</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems && cartItems.map((element, index) => (
            <tr className="bg-base-200" key={index}>
              <th>{index + 1}</th>
              <td>{element.service}</td>
              <td>{element.amount}</td>
              <td>
                <button
                  className='bg-red-500 px-3 py-2 rounded-md w-full lg:w-[100px] md:w-[90px] active:scale-90 shadow-md'
                  onClick={() => removeToCart(element)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
      <div className='text-right py-9 px-9 flex justify-end flex-col gap-4'>
        <div>
          <input
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
            className='px-3 py-2 rounded-md w-[200px]'
          />
        </div>
        <div>
          <button
            className='bg-green-500 px-3 py-2 rounded-md w-[100px] active:scale-90'
            onClick={booking}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
