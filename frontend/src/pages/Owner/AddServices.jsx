import React, { useState } from 'react';
import { useUserContext } from '../../../context/userContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddServices = () => {
    const { user, setUser } = useUserContext();
    const [service, setService] = useState('');
    const [amount, setAmount] = useState('');
    const navigate=useNavigate()
 console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.user._id) {
            console.error('User ID is undefined');
            return;
        }
        const userId = user.user._id;
        if (!user.user.email) {
            console.error('email ID is undefined');
            return;
        }
        const email=user.user.email;
        console.log(email+"cfgbvj")
        try {
            const response = await axios.post('http://localhost:4000/api/service/addservice', {userId,email,service,amount});
            console.log(response.data);
            if(response.data.success)
            {
                toast.success(response.data.message)
                setService('')
                setAmount('')
                setTimeout(() => {
                    navigate('/service');
                }, 3000);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='addservice'>
            <div className='h-screen pt-[23vh]'>
                <form className='ease-in duration-300 w-max w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5' onSubmit={handleSubmit}>
                    <span className='text-center m-4 text-2xl'>Add Services</span>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm mb-2'>
                            Service name
                        </label>
                        <input type='text' value={service} onChange={e => setService(e.target.value)} name='service' placeholder='Enter service name' className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm mb-2'>
                            Amount
                        </label>
                        <input type='number' value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter the amount' className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>
                    <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center' type='submit'>Submit</button>
                    <ToastContainer/>
                </form>
            </div>
        </div>
    );
};

export default AddServices;
