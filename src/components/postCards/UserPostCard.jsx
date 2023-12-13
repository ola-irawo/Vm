import React, { useState } from 'react'
import "./user-post-card.css"
import profileAvatar from "./assets/svgs/profileAvatarIcon.svg"
import postMenu from "./assets/svgs/postMenuIcon.svg"
import Button from "../ui/Button"
import Loader from "../loader/Loader"
import { useSelector } from 'react-redux'
import { selectUserById } from '../../services/user/reducers/userSlice'
import Upvote from './components/postInteraction/upvote/Upvote'
import Downvote from './components/postInteraction/downvote/Downvote'
import Share from './components/postInteraction/share/Share'
import UserOption from '../userOptionModal/UserOption'
import useToggle from '../../hooks/useToggle'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from './components/postInteraction/comment/Comment'

const UserPostCard = ({posts, options}) => {
    // const [showUserOptionsMenu, setShowUserOptionsMenu ] = useState(true)
    const [showUserOptionsMenu, setShowUserOptionsMenu] = useToggle(false)
    const { user, post, _id} = posts
    const currentUser = useSelector(state => selectUserById(state, user._id))
    const navigate = useNavigate()

    const userName = currentUser.username

    const follow = () => {
        const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
        };
    }
    const {id} = useParams()

    // const userOptions = [
    //     {label: `Follow @${userName}`, action: () => follow()},
    //     {label: `Copy Link`, action:  () =>  console.log("link")},
    //     {label: `Mute @${userName}`, action:  () =>  console.log("mute")},
    //     {label: `Block @${userName}`, action: () =>  console.log("block")},
    //     {label: `Report Post`, action:() => console.log("report")},
    // ]

  return (
    <article className="post-card" typeof="schema:Posting">
        
        <div className="post-wrapper">

            <div className="post-main-content">
                <div className="post-head">
                    <div className="user-details">
                        <div className="user-image-container" onClick={() => navigate(`/profile/${user._id}`)}>
                            <img src={profileAvatar} title="avatar" className="user-avatar" alt="Lil Mascort profile avatar"/>
                        </div>

                        <div className="name-date-container">
                            <h3 className="user-name">{userName}</h3>
                            <small className="post-time">08: 21 AM</small>
                        </div>
                    </div>
                {!id && <div className={`post-menu-container`}  onClick={setShowUserOptionsMenu}>
                        <img src={postMenu} className="post-menu" alt="Post menu options" />
                        {showUserOptionsMenu && <UserOption user={user} postId={_id} options={options} />}
                    </div>}
                </div>

                <div className="post-content-container">
                    <p className="post-content">
                        {post}
                    </p>
                </div>
            </div>

            <hr className="post-line-break" />

            <div className="post-interactions-container">
                <div className="post-btn-wrapper">
                    <Upvote posts={posts} />
                    <Downvote posts={posts} />
                    <Share posts={posts}/>
                    <Comment posts={posts}/>
                </div>
            </div>
        </div>
      
    </article>
  )
}

export default UserPostCard
