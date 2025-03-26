"use client"
import React, { useEffect } from 'react'
import axios from 'axios';
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs';
function Provider({children}) {
  const {user}=useUser();
  console.log(user);
  //save user data

  useEffect(()=>{
    user&&CheckUserAuth();
  },[user])
  const CheckUserAuth= async()=>{
    //save user to database
    const result=await axios.post('/api/users',{
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress
    })
    console.log(result.data);
  }
  return (
    <div>
        <Header/>
        <div className='px-10 lg:px-32 xl:px-48 2xl:px-56'>
        {children}
        </div>

    </div>
  )
}

export default Provider
