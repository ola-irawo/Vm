import React from 'react'
import DynamicDecisionPrompter from '../../../../../../components/DynamicDecisionPrompter'
import "./profile-setup.css"
import { useDispatch, useSelector } from 'react-redux'
import { getBioError, getBioStatus } from '../../../../../../services/bio/reducers/bioSlice'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { createBio } from '../../../../../../services/bio/actions/createBio'

const ProfileSetup = () => {
  const template = {
    fields:[
       {
        name: "bio",
        type: "textarea"
      }
    ]
  }

  const dispatch = useDispatch()
  const bioStatus = useSelector(getBioStatus)
  const error = useSelector(getBioError)
  const currentUser = getCurrentUser()


  const setUpProfile = () => {
    try{
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}`
        },
        body: JSON.stringify({bio: "", avatar: ""})
        
      }
      dispatch(createBio(payload))
    }
    catch(error){
      // console.log(error)
    }
    finally{
      bioStatus = "idle"
    }
  }
  
  return (
    <article className="profile-article">
      <div className="profile-text-container">
        <h2>Hi Irawo</h2>
        <p>Before you continue, Kindly upload your profile picture (You can choose from a selection of avatars provided only by the platform) </p>
      </div>

      <div className="profile-file-container">
        <input type="file" className="profile-file" />
      </div>

      <div className="profile-form-container">
        <h3>Bio <span>(up to 300 characters)</span></h3>
        <DynamicDecisionPrompter template={template} className={"profile-form"}/>
      </div>

    </article>
  )
}

export default ProfileSetup
