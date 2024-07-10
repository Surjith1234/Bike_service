import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/userContext';
import { useCartContext } from '../../context/cartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Service = () => {
    const [service,setService]=useState([]);//state to store the service
   const {cartItems,addToCart}=useCartContext()
    const {user}=useUserContext()//get the current user
   const navigate=useNavigate()   //to navigate to another component
  console.log(cartItems)
 
  const handleDelete=async(id)=>{
    console.log(id+"tf")
    // to delete the particular service
    const del=await axios.delete('http://localhost:4000/api/service/delete-service',{data:{id}})
    console.log(del)
    //if the deletion is successfull 
    if(del.data.success)
      {
        toast.success(del.data.message)
      }
    }
    const getService=async()=>{
      //to fetch the service data from server through api
       const res=await axios.get('http://localhost:4000/api/service/getService')
       console.log(res)
       //if fetching is successfull to store in service hook
       if(res.data.success)
        {
            setService(res.data.data.getData)
            toast.success(res.data.message)
          }
          else
          {
          toast.error(res.data.message)
        }
    }
    useEffect(()=>{
        getService()
    },[handleDelete])
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
     {
     service&&service.map(element=>(
        <tr className="bg-base-200">
        <th>1</th>
        <td>{element.service}</td>
        <td>{element.amount}</td>
        {
            user?.user?.role==='Customer'&&<td><button className='bg-green-500 px-3 py-2 rounded-md w-full lg:w-[100px] md:w-[90px] shadow-md active:scale-90' onClick={()=>addToCart(element)}>Add</button></td>
        }
       {
             user?.user?.role==='Owner'&&<td className='flex gap-3 flex-col md:flex-row lg:flex-row  xl:flex-row'>
              <button className='bg-red-500 px-3 py-2 rounded-md w-full lg:w-[100px] md:w-[90px] active:scale-90 shadow-md' onClick={()=>handleDelete(element._id)}>Delete</button>
              <button className='bg-green-500 px-3 py-2 rounded-md w-full lg:w-[100px] md:w-[90px] active:scale-90 shadow-md' onClick={()=>navigate('/updateservice',{replace:true,state:{id:element._id}})}><Link to='/updateservice'>Edit</Link></button></td>
       }
        </tr>
     ))
     }
    </tbody>
  </table>
  <div className='text-right py-9 px-9'>
  <Link to='/booking'>
     <button className='bg-green-500 px-3 py-2 rounded-md w-[100px] active:scale-90' >Book</button></Link>
</div>
<ToastContainer/>
</div>
  )
}

export default Service