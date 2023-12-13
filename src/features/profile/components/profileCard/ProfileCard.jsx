import React from 'react'
import "./profile-card.css"
import Button from '../../../../components/ui/Button'
import profileAvatar from "../../assets/svgs/profileAvatar.svg"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBioError, getBioStatus } from '../../../../services/bio/reducers/bioSlice'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import { updateBio } from '../../../../services/bio/actions/updateBio'
import { selectUserById } from '../../../../services/user/reducers/userSlice'

const ProfileCard = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const currentUser = getCurrentUser()
    const user = useSelector(state => selectUserById(state, currentUser.userUid))
    const bioStatus = useSelector(getBioStatus)
    const error = useSelector(getBioError)


    const editProfile = () => {
        try{
            const payload = {
                options: {
                    method: "PATCH",
                    headers:{
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${currentUser.userTokem}`
                    }
                },
                userUid: currentUser.userUid
            }

            dispatch(updateBio(payload))
        }
        catch(error){
            // console.log(error)
        }
        finally{
            bioStatus = "idle"
        }
    }
  return (
    <section className="profile-card-section">
        <article className="profile-card" typeof="schema:Profile">
            {/* <div className="profile-card-wrapper"> */}

                <div className="profile-card-details">
                    <div className="profile-details">
                        <div className="profile-avatar-container">
                            <img src={profileAvatar} className="profile-avatar" alt="Lil Mascort profile avatar"/>
                        </div>

                        <div className="profile-metadata-container">
                            <h3 className="profile-name">{user.username}</h3>
                            <small className="profile-creation-date">Joined March 2021</small>
                        </div>
                    </div>
                    
                    <div className="">
                        { 
                            !id 
                            ? 
                            <Button className={"profile-btn"} text={"Edit profile"} /> 
                            :
                            <Button className={"profile-btn"} text={"Mute"}/>
                        }
                    </div>
                </div>
            

                <div className="profile-bio-container">
                    <p className="profile-bio">
                        Hi everyone! I’m new here.
                        And I”m looking to work through some past traumas and issues that’s I have that’s got me struggling lately and help and uplift others and make life enjoyable again for myself I have forgot my self identity and lost all motivation and who I am now and it’s a lonely place to be.
                    </p>
                </div>
            {/* </div> */}
        </article>
    </section>
  )
}

export default ProfileCard
