import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

const UpdateService = () => {
    const [updateService,setUpdateService]=useState()////state to store the services
    const [service,setService]=useState()//state to store the service
    const [amount,setAmount]=useState()//state to store the amount
    const location=useLocation()
    const navigate=useNavigate();
    const {id}=location.state
    console.log(id)
    const fetchService=async()=>{
        //to fetch the service for particular service for updating
        const res=await axios.post('http://localhost:4000/api/service/getById',{id})
        console.log(res.data.data.getData)
        if(res.data.success)
         {
             setUpdateService(res.data.data.getData)
         }
         const { service, amount } = res.data.data.getData[0];
         setService(service);
         setAmount(amount.toString()); 
    }
    useEffect(()=>{
        fetchService()
    },[])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            //to update the service
            const update=await axios.put('http://localhost:4000/api/service/update-service',{id,service,amount})
            console.log(update+"s")
            //if its successfull to navigate to service page
            if(update.data.success)
            {
                navigate('/service')
            }
        }catch(err)
        {
            console.log(err)
        }
    }
    
  return (
    <div className='w-full mx-auto pt-[23vh] h-[100%] h-screen'>
    <form className='ease-in duration-300 w-max w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-9 py-5' onSubmit={handleSubmit}>
        <span className='text-center m-4 text-2xl'>Update Services</span>
             <div>
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
        <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center' type='submit' onClick={()=>handleUpdate()}><Link to='/service'>Update</Link></button>
        </div>
    </form>
</div>
  )
}

export default UpdateService