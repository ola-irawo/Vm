import React, { useState } from 'react'
import Form from '../../../../components/Form'
import "./sign-up.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { bottomSvg, leftSvg, rightSvg, otpImage, useWindowWidth } from '../..'
import brandLogo from '../../assets/svgs/brandLogo.svg'
import {useDispatch} from"react-redux"
import { signupAction } from '../../actions/authAction'
import DynamicFormField from '../../../../components/ui/DynamicFormField'
import Button from '../../../../components/ui/Button'

const SignUpForm = () => {
    const {screenWidth} = useWindowWidth()
    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        gender: "",
        isAbove18: false,
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFormChange = (e) => {
        try{
            const {name, value, type, checked} = e.target;
            setUserFormData(oldData => {
                return {
                    ...oldData,
                    [name]: value,
                }
            })
            console.log(userFormData)
        }
        catch(error){
            console.log(error)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
              // Check if every field in userFormData has a value
            const isFormDataValid = Object.values(userFormData).every((value) => value);

            console.log(Object.values(userFormData))
            if (!isFormDataValid) {
                // If any field is empty, handle accordingly (show an error message, for example)
                console.error("Please fill in all the fields.");
                return;
            }

            if(userFormData && userFormData.password !== userFormData.confirm_password){
                throw new Error("Password does not match")
            }
            const options = {
                method: "POST",
                body: JSON.stringify(userFormData),
            };

            dispatch(signupAction(options))  
            
            setUserFormData({
                username: "",
                email: "",
                password: "",
                confirm_password: "",
                gender: "",
                isAbove18: false
            })
            navigate("/otp")
          } catch (error) {
            console.error("Signup error:", error.message);
        }
    }

    return (
    <article className="sign-up-container">

        <div className="register-wrapper">

            {
                screenWidth >= 618 && <div className="register-image-container">
                    <img src={otpImage} className="register-image" alt="register" />
                    {screenWidth >= 618 && <h3>Welcome back</h3>}
                    {screenWidth >= 618 && <p>...bridging the gap between social media and mental health.</p>}
                </div>
            }

            <div className="register-content-container">
                <div className="register-brand-container">
                    <img src={brandLogo} className="register-brand-logo" alt="brand-logo" />
                </div>

                <form className="register-form" onSubmit={handleFormSubmit}>
                    {screenWidth < 618 && <h3>Sign up</h3>}

                    <DynamicFormField type={"text"} name={"username"} value={userFormData.username} placeholder={"User name"} onChange={handleFormChange} />
                    <DynamicFormField type={"email"} name={"email"} value={userFormData.email} placeholder={"Email address"} onChange={handleFormChange} />
                    <DynamicFormField type={"password"} name={"password"} value={userFormData.password} placeholder={"Password"} onChange={handleFormChange} />
                    <DynamicFormField type={"password"} name={"password"} value={userFormData.confirm_password} placeholder={"Confirm Password"} onChange={handleFormChange} />
                    <DynamicFormField type={"text"} name={"gender"} value={userFormData.gender} placeholder={"Gender"} onChange={handleFormChange} />

                    <div className="signup-checkbox">
                        <p>Are you above 18 or above?</p>
                        <div className="checkbox">
                            <DynamicFormField type={"radio"} name={"isAbove18"} value={"true"} label={"Yes"} 
                            onChange={() => {
                                setUserFormData(oldData => {
                                    return {
                                        ...oldData,
                                        isAbove18: true
                                    }
                                })
                            }}
                            />
                            <DynamicFormField type={"radio"} name={"isAbove18"} value={"false"} label={"No"}
                            onChange={() => {
                                setUserFormData(oldData => {
                                    return {
                                        ...oldData,
                                        isAbove18: false
                                    }
                                })
                            }}
                            />
                        </div>
                    </div>

                    <Button text={"Signup"} />
                </form>
               

                <div className="login-disclaimer-container">
                    <div className="disclaimer-content">
                        <p className="disclaimer-text">
                            By Signing up, you agree to the <NavLink>Terms of use</NavLink> and <NavLink>Privacy Policy</NavLink>
                        </p>
                    </div>

                    <div className="login-call-to-action">
                        <p className="disclaimer-text">
                            Already have an account? 
                        </p>
                        
                        <NavLink to={"/login"}>Sign in</NavLink>
                    </div>
                </div>
            </div>
      </div>
    </article>
  )
}

export default SignUpForm
