import Store, { storeContext } from '@/Context/Store'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../ui/button';
import { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link'; // Import HashLink


const Header = () => {
  const{token,setToken,setShowLogin}=useContext(storeContext)
  

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }
  
   

  return (
    <div className=' mx-5 md:mx-20 lg:mx-36 flex p-4 items-center justify-between  '>
     <img src={'/logo-no-background.png'} width={160} height={100} alt='logo'/>
     <ul className='flex gap-6'>
      <li onClick={token? ()=>navigate('/dashboard'):()=>setShowLogin(true)} className='hover:text-primary font-bold transition-all cursor-pointer'>Dashboard</li>
      <li className="hover:text-primary font-bold transition-all cursor-pointer">
          <HashLink smooth to="/#how-it-works" > How it Works?</HashLink></li>      
        </ul>
      {!token ? (
    <Button
      onClick={() => setShowLogin(true)}
      className='bg-zinc-800 text-white  items-center gap-4 px-10 py-6 sm:px-8 sm:py-3 text-sm rounded-full'
    >
      Sign In
    </Button>
  ) : (
    <div className="relative group">
      <img src="profile_icon.png" alt="" className="w-8 h-8" />
      <ul className="absolute right-0 hidden flex-col gap-2 bg-white border border-tomato rounded shadow-lg py-3 px-5 group-hover:flex z-10">
        <li
          onClick={logout}
          className="flex items-center gap-2 cursor-pointer hover:text-red-500"
        >
          <img src="logout_icon.png" alt="" className="w-3" />
          <p>Logout</p>
        </li>
      </ul>
    </div>
  )}
    </div>
  )
}

export default Header
