import React, { useState } from 'react'
import './LoginPopup.css'
import { useContext } from 'react'
import { storeContext } from '../../Context/Store'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from '../ui/button'


const LoginPopup = () => {

    const {setToken,setShowLogin}=useContext(storeContext)

    const [currState, setCurrState] = useState("Login")

    const [data, setData] = useState({
        name: "",
        email: "",  
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()

        let new_url = process.env.REACT_APP_BACKEND_URL;
        if (currState === "Login") {
            new_url += "/api/login";
        }
        else {
            new_url += "/api/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            //loadCartData({token:response.data.token})
            setShowLogin(false)
        }
        else {
            toast(response.data.message)
        }
    }
    
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <p className='text-black font-bold text-lg'>{currState}</p>
                    <img onClick={() => setShowLogin(false)} src='cross_icon.png' alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password}  type="password" placeholder='Password' required />
                </div>
                <Button>{currState === "Sign Up" ? "Create account" : "Login"}</Button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing , i agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login"   
                    ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup