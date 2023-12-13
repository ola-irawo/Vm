import React, { useState } from 'react'
import "./post-modal.css"
import BrandLogo from '../../brandLogo/BrandLogo'
import Button from '../Button'
import DynamicFormField from '../DynamicFormField'
import userAvatar from "./userAvatar.svg"
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../../libs/getCurrentUser'
import { createPost } from '../../../services/post/actions/crud/createPost'

const PostModal = ({setShowPostModal, id}) => {
    const [newPostData, setNewPostData] = useState({
        post: "",
        user: "Irawo",
        societyId: id ? id : ""
      })
      const currentUser = getCurrentUser()
      const dispatch = useDispatch()

    const handleCreatePost = async (e) => {
        // e.preventDefault()
        try{
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
            body: JSON.stringify(newPostData)
          }
    
           dispatch(createPost(options))
        }
        catch(error){
          console.log(error)
        }
      }
      
  return (
    <article className="post-modal">
        <div className="post-modal-head">
            <Button 
                className={"close-post-modal"}
                text={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 19 16" fill="none">
                    <path d="M0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538407 7.04738 0.538407 6.65686 0.928931L0.292893 7.29289ZM19 7L1 7L1 9L19 9L19 7Z" fill="#263238B2" fill-opacity="0.7"/>
                </svg>}
                handleEvent={() => setShowPostModal(false)}
             />

            <BrandLogo />

            <Button text={"Post"} className={"post-modal-btn"} handleEvent={() => handleCreatePost()} />
        </div>

        <form  className="post-modal-form">
        {/* <Button text={"Post"} className={"post-modal-btn"} /> */}

            <div className="profile-avatar-container">
                <img src={userAvatar} className="post-modal-avatar" alt="profile-avatar" />
            </div>

            <DynamicFormField 
                type={"textarea"} 
                placeholder={"Write something here"}
                value={newPostData.post}
                onChange={(e) => setNewPostData({ ...newPostData, post: e.target.value })}
             />
        </form>

    </article>
  )
}

export default PostModal
