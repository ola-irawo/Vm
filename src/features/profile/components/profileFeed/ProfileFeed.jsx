import React, { useEffect, useState } from 'react'
import "./profile-feed.css"
import UserPostCard from '../../../../components/postCards/UserPostCard'
import Button from '../../../../components/ui/Button'
import { selectAllPosts } from '../../../../services/post/reducers/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByUser } from '../../../../services/user/actions/getPostsByUser'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import { selectUserById } from '../../../../services/user/reducers/userSlice'
import { useParams } from 'react-router-dom'
import PostFeed from './components/postFeed/PostFeed'
import Comment from './components/commentFeed/Comment'
import Upvote from './components/upvoteFeed/Upvote'
import Downvote from './components/downvoteFeed/Downvote'

const ProfileFeed = () => {
  const [activeFeed, setActiveFeed] = useState(() => {
    return localStorage.getItem('activeFeed') || 'Posts';
  });
  
  const allPosts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()
  const {id} = useParams()

  const profileOptions = [
    {label: `Pin to profile`, action: () => console.log("link")},
    {label: `Delete Post`, action:  () =>  console.log("link")},
    {label: `Edit post`, action:  () =>  console.log("mute")},
    {label: `Change who can reply`, action: () =>  console.log("block")},
  ]

  // const postsByUser = () => {
  //   try{

  //     const payload = {
  //       options: {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${currentUser.userToken}
  //           `,
  //         },
  //       },
  //       _id: profileId ? profileId : currentUser.userUid

  //     }

  //     dispatch(getPostsByUser(payload))

  //   }

  //   catch(error){
  //     console.log(error)
  //   }
  // // }

  // useEffect(() => {
  //   postsByUser()
  // }, [dispatch, profileId])

    const handleActiveFeed = (activeFeed) => {
      setActiveFeed(activeFeed)
    }

    const renderActiveFeed = () => {
      switch(activeFeed){
        case "Posts":
          return <PostFeed profileOptions={profileOptions} />
        case "Comments":
          return <Comment />
        case "Upvotes":
          return <Upvote profileOptions={profileOptions} />
        case "Downvotes":
          return <Downvote profileOptions={profileOptions} />
        default:
          return "Posts"
      }
    }

    useEffect(() => {
      // Save the active feed value to localStorage
      localStorage.setItem('activeFeed', activeFeed);
    }, [activeFeed]);

  return (
    <section className="profile-feed">        
      <div className="profile-engagement-container">
          <ul className="profile-engagement-list">
            <li className="engagement-item">
              <Button text={"Posts"} handleEvent={() => handleActiveFeed("Posts")} />
            </li>
            <li className="engagement-item">
              <Button text={"Comments"} handleEvent={() => handleActiveFeed("Comments")} />
            </li>
            <li className="engagement-item" >
              <Button text={"Upvotes"} handleEvent={() => handleActiveFeed("Upvotes")} />
            </li>
            <li className="engagement-item">
              <Button text={"Downvotes"} handleEvent={() => handleActiveFeed("Downvotes")} />
            </li>
          </ul>
      </div>

      <hr className="profile-feed-line-break" />

      {renderActiveFeed()}
    </section>
  )
}

export default ProfileFeed
