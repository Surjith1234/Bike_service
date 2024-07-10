import axios from 'axios'
import React, { useEffect } from 'react'
import { useUserContext } from '../../context/userContext'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
    const {user,setUser}=useUserContext()  //to use user from useUsercONTEXT
    const getUser=async()=>{
        try{
            const res=await axios.post(
                'http://localhost:4000/api/user/get-user',
                {
                    token:localStorage.getItem("token") //get token from local storage token means user data
                },{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if(res.data.success)
            {
                setUser(res.data.data)  //TO FETCH THE USER DATA TO UPDATE IN SETuSER FROM USEUSERCONTEXT
            }
            else{
                <Navigate to='/login' /> //redirect to login page
                localStorage.clear()
            }
        }
     
        catch(err)
        {
            localStorage.clear()
            console.log(err);
        }
    }
    useEffect(()=>{
        if(!user)
        {
            getUser()  //to fetch the user data
        }
     },[user])
     if(localStorage.getItem('token'))
        {
           return children
        }
        else
        {
           return <Navigate to='/login' />
        }
}

export default ProtectedRoute
