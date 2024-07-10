import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.jpeg'
import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useUserContext } from '../../context/userContext';
const Navbar = () => {
  const {user,setUser}=useUserContext()//get the current user
  console.log(user)
    const [nav,setNav]=useState();
    const handleNav =()=>{
        setNav(!nav)           //to update the navbar true or false used for responsive
      }
  return (
    <div className="bg-white/80 shadow-md fixed top-0 left-0 w-full z-40 ease-in duration-300 backdrop-blur-md">
   <div className='py-5 px-10 sm:px-4 md:px-6 lg:px-6'>
    <div className=' container mx-auto flex items-center justify-between'>
   <img src={Logo} className='h-[40px] w-[30px] cursor-pointer'/>
    <div className='lg:flex hidden gap-8 items-center'>
    <a href='' className='text-xl font-medium hover:text-red-500'><Link to='/home'>Home</Link></a>
    {
      user?.user?.role==='Owner' && <a href='' className='text-xl font-medium hover:text-red-500'><Link to='/addservice'>Add Services</Link></a> //onclick navigate to addservice page if user is owner
    }
    {
      user?.user?.role==='Customer' &&<a href='' className='text-xl font-medium hover:text-red-500'><Link to='/service'>Services</Link></a>//onclick navigate to service page
    }
    
      <a href='' className='text-xl font-medium hover:text-red-500'><Link to='/mybooking'>Booking</Link></a> 
    
    {
         user?(<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="profile" src={user?.user?.Image} />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
        
        <li><Link to='/mybooking'>
           My Bookings
      </Link></li>
        <li><button onClick={()=>{ 
          localStorage.clear() //to clear the local storage
          location.reload()
          navigate("/")
        }}>Logout</button></li>  
      </ul>
    </div>):(<Link to='/login'>
      <button className='bg-[#f54748] active:scale-90 transition duration-100 tranform
      hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'>Login</button>
      </Link>)
      }
      </div>
    <div className='lg:hidden z-40' onClick={handleNav}>
      {
        nav?(<RxCross2 className='cursor-pointer'/>):(<IoMenuSharp className='cursor-pointer'/>)
      }
     </div>
     <div className={`lg:hidden absolute w-1/2 sm:w-2/5 h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm
     backdrop-blur-md bg-white/80 top-6 duration-500 ${nav?"right-0":"right-[-100%] "} pt-24`}>
        <div className='flex flex-col gap-8'>
        <a href='' className='text-xl font-medium hover:text-red-500'><Link to='/home'>Home</Link></a>
        {
      user?.user?.role==='Owner' && <a href='' className='text-xl font-medium hover:text-red-500'>Add Services</a> //onclick navigate to addservice page if user is owner
    }
    {
      user?.user?.role==='Customer' &&<a href='' className='text-xl font-medium hover:text-red-500'><Link to='/service'>Services</Link></a>//onclick navigate to service page
    }
    
      <a href='' className='text-xl font-medium hover:text-red-500'><Link to='/mybooking'>Booking</Link></a> 
      
     </div>
     </div>
    </div>
   </div>
   </div>
   
  )
}

export default Navbar