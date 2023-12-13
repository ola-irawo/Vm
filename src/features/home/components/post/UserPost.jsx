import React, { useState } from 'react'
import "./user-post.css"
import UserPostCard from '../../../../components/postCards/UserPostCard'
import { useSelector } from 'react-redux'
import { getPostError, getPostStatus, selectAllPosts } from '../../../../services/post/reducers/postSlice'
import PostButton from '../../../../components/postButton/PostButton'
import PostModal from '../../../../components/ui/postModal/PostModal'
import { useWindowWidth } from '../../../authentication'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import { selectUserById } from '../../../../services/user/reducers/userSlice'
import Loader from '../../../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'

const UserPost = () => {
  const [showPostModal, setShowPostModal] = useState(false)
  const {screenWidth} = useWindowWidth()
  const allPosts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostStatus)
  const navigate = useNavigate()
  
  const activeUser = getCurrentUser()
  const currentUser = useSelector(state => selectUserById(state, activeUser.userUid))


  if(postStatus !== "fulfilled"){
    return <Loader />
  }

  const isMobile = screenWidth <= 767

 

  // const userName = activeUser.userUid === currentUser._id && currentUser.username

  const options = [
    {label: `Copy Link`, action:  () =>  console.log("link")},
    {label: `Mute @`, action:  () =>  console.log("mute")},
    {label: `Block @`, action: () =>  console.log("block")},
    {label: `Report Post`, action:() => console.log("report")},
    // {label: `Delete Post`, action:() => console.log("report")},
  ]

  return (
    <section className="post-section">
      {allPosts.map(post => {
        return <UserPostCard key={post._id} posts={post} options={options} />
      })}
      {isMobile && showPostModal && <PostModal setShowPostModal={setShowPostModal} />}
      {isMobile && !showPostModal && <PostButton setShowPostModal={setShowPostModal} />}
      {/* {!isMobile && <PostInput /> } */}
    </section>
  )
}

export default UserPost
