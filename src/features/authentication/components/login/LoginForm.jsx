import React, { useEffect, useState } from 'react'
import Form from '../../../../components/Form'
import "./login.css"
import { NavLink, useNavigate } from 'react-router-dom'
import brandLogo from '../../assets/svgs/brandLogo.svg'
import { bottomSvg, leftSvg, otpImage, rightSvg, useWindowWidth } from '../..'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../actions/authAction'
import { getLoginStaus } from '../../reducers/authSlice'
import Loader from '../../../../components/loader/Loader'
import { unwrapResult } from '@reduxjs/toolkit'

const LoginForm = () => {
  const {screenWidth} = useWindowWidth()
  const loginStatus = useSelector(getLoginStaus)
  const [currentUserDetails, setCurrentUserDetails] = useState({})
  const [loginCredentials, setLoginCredentials]= useState({
    username: "",
    password: "",
    anonymous: ""

  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const template = {
    title: screenWidth < 618 && "Login",
    confirmedBtnText: "Sign in",
    fields :[
      {
        name: "username",
        value: loginCredentials.username,
        type: "text",
        placeholder: "Username"
      },
      {
        name: "password",
        value: loginCredentials.password,
        type: "password",
        placeholder: "Password"
      },
    ]
  }

  const handleFormChange = (e) => {
    try{
      const { name, value} = e.target;
      setLoginCredentials(oldData => {
        return {
          ...oldData,
          [name]: value
        }
      })

    }
    catch(error){
      // console.log(error)
    }
  }

  const handleUserLogin = async (e) => {
    e.preventDefault()
    try{
      const options = {
        method: "POST",
        body: JSON.stringify(loginCredentials),
    };

    const resultAction = await dispatch(loginAction(options));
    const result = unwrapResult(resultAction);
    setCurrentUserDetails(result)

    // Handle the result as needed
    console.log(result);
    console.log(loginCredentials)
      setLoginCredentials({
        username: "",
        password: "",
        anonymous: ""
      })
    }
    catch(error){
      // console.log(error)
    }
  }

  useEffect(() => {
    if(loginStatus === "fulfilled"){
      navigate("/home", {replace: true, state: currentUserDetails})

    }

  }, [loginStatus])

  if(loginStatus === "loading"){
    return <Loader />
  }


  return (
    <article className="login-container">
        <div className="login-wrapper">
          {
            screenWidth >= 618 && <div className="login-image-container">
              <img src={otpImage} className="login-image" alt="login" />
              {screenWidth >= 618 && <h3>Welcome back</h3>}
              {screenWidth >= 618 && <p>...bridging the gap between social media and mental health.</p>}
            </div>
          }

          <div className="login-content-container">
            <div className="login-brand-container">
              <img src={brandLogo} className="login-brand-logo" alt="brand-logo" />
            </div>

            <Form template={template} onSubmit={handleUserLogin} className={"login-form"} onChange={handleFormChange}/>

            <div className="new-user-call-to-action-container">
              <p className="call-to-action-text">Not a member?</p>
              <NavLink to="/register" className={"call-to-action-link"}>Sign up</NavLink>
            </div>
        </div>
      </div>
    </article>
  )
}

export default LoginForm


