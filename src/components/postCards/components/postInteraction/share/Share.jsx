import React from 'react'
import "./share.css"
import Button from '../../../../ui/Button'
import { getCurrentUser } from '../../../../../libs/getCurrentUser'
import { useDispatch } from 'react-redux'
import { sharePost } from '../../../../../services/post/actions/interactions/share'

const Share = ({posts}) => {
    const currentUser = getCurrentUser()
    const dispatch = useDispatch()

    const {_id} = posts
    
    const handleShare = () => {
        const payload = {
            options: {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${currentUser.userToken}
                  `,
                }
            },
             _id
        }
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            }
        };
        dispatch(sharePost(payload))
    }
    
  return (
    <Button 
        className={"share-btn"}
        handleEvent={handleShare}
        text={
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 24" fill="none">
                    <path d="M25 12L15.4 1V6.5C10.6 6.5 1 9.8 1 23C1 21.1661 3.88 17.5 15.4 17.5V23L25 12Z" stroke="#111111" strokeOpacity="0.68" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>200</span>
            </div>
        }
    
    />
  )
}

export default Share
