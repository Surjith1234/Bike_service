import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Profile from '../assets/th.jpg'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const navigate=useNavigate()
  const [name,setName]=useState()//state to store the name
  const [number,setNumber]=useState()//state to store the phone number
  const [email,setEmail]=useState()//state to store the email
  const [password,setPassword]=useState()//state to store thepassword
  const [confirmPassword,setConfirmPassword]=useState()//state to store the confirmpassword
  const [role,setRole]=useState()//state to store the role if the user is customer or owner
  const [image,setImage]=useState({})////state to store the image
  const Image=image.url
  console.log(Image+"surjit")
  

  const handlesubmit=async(e)=>{
    e.preventDefault()
    //to store the data in server
    const register=await axios.post('http://localhost:4000/api/user/register',{name,number,email,password,confirmPassword,role,Image})
    console.log(register.data.data.token);
  //if its successfull
    if(register.data.success)
      {
        localStorage.setItem("token",register.data.data.token)  //after register to store user data in localstorage
        toast.success(register.data.message)
        setTimeout(()=>{
          navigate('/')
          
        },3000)
      }
      else{
        toast.error(register.data.message)
      }
  //  console.log(register);
  }
  const handleImage=async(e)=>{
    const file=e.target.files[0]
    console.log(file)
    let formData=new FormData()
    formData.append('image',file)
    try{
          const {data}=await axios.post('http://localhost:4000/api/img/upload-image',formData) //to pass the image to backend
          setImage({ //after store the image in cloud then get url from backend to setImage
           url:data.url,
           public_id:data.public_id
          })
      }
        catch(err)
        {
          console.log(err)
        }
        console.log(image+"efds")
  }
  return (
    <div className='register'>
    <div className='w-full mx-auto pt-[16vh] h-[100%]'>
         <form className='ease-in duration-300 w-max w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5' onSubmit={handlesubmit}>
         <div className='text-xl text-center p-3 '>Register</div>
          <label htmlFor='file-upload' className='custom-file-upload'>
              <img src={image?.url || Profile} alt="" className='h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer'/></label> {/* to get the image from user to set user profile */}
              <label className='block text-center text-gray-900 text-base mb-2'>Profile Picture</label>
              <input type='file' label='Image' name='myFile' id='file-upload'  accept='.jpeg, .png, .jpg' className='hidden' onChange={handleImage}/>
              <div className='mb-4'>
              <label className='block text-gray-700 text-sm mb-2'>
                  Name
              </label>
              <input type='text' placeholder='Enter your name' className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={name} onChange={e=>setName(e.target.value)}></input>
             </div>
              <div className='mb-4'>
              <label className='block text-gray-700 text-sm mb-2'>
                  Mobile Number
              </label>
              <input type='number' placeholder='Enter your Mobile Number'  className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={number} onChange={e=>setNumber(e.target.value)}></input>
             </div>
              <div className='mb-4'>
              <label className='block text-gray-700 text-sm mb-2'>
                  Email
              </label>
              <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Enter your email' name="email" className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
             </div>
          <div className='flex flex-col md:flex-row md:gap-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm mb-2'>
                  Password
              </label>
              <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='****************' name="password" className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
             </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm mt-2'>
                 Confirm Password
              </label>
              <input type='password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder='***************' name="confirmpassword" className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
             </div>
 
          </div>
          <div className='mb-4'>
   <label className='block text-gray-700 text-sm mt-2'>
    {/* to select the role owner or customer */}
                 Role
              </label>
          <select className="mb-4 select select-accent max-w-xs border-gray-300 shadow-md w-full" value={role} onChange={e=>setRole(e.target.value)}>
  <option disabled selected>select the role</option>
  <option>Owner</option>
  <option>Customer</option>
</select>
          </div>
          <button className='bg-[#f54748] active:scale-90 transition duration-150 tranform
             hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3' type='submit'>Register</button>
           <Link to='/login' className='text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded mt-4'>Already Account</Link>
           <ToastContainer/> 
         </form>
    </div>
  </div>
  )
}

export default Register