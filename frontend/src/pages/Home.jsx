import React from 'react'
import Bike from '../assets/bike.avif'

const Home = () => {
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
    <div className='h-screen py-[15vh]'>
      <div className="mt-5 text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl"> 
           <span className="text-[#Fdc55e]">Bike</span>  <span className="text-[#Fdc55e]">Service</span>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 font-sens'>
           <div className='mt-3  lg:text-3xl text-[#191919] md:text-3lg text-xl font-semibold'>
         Streamline Your Bike Maintenance with Our Comprehensive Bike Service Application
        <div className='text-red-500 font-serif text-xl mt-3 lg:text-2xl'>Effortless Booking, Real-Time Tracking</div>
        <div className='text-red-500 font-serif text-xl mt-3 lg:text-2xl'>Seamless Payments and Secure Transactions
</div>
        <div> <button className='mt-5 bg-[#f54748] active:scale-90 transition duration-500 transform
                hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'> explore now</button>
         </div>
         </div>
         <img src={Bike} className='h-[28rem] mx-auto justify-end rounded-xl h-[400px]'></img>
      </div>
      
    </div>
    </div>
  )
}

export default Home