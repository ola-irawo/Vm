import React, { useEffect } from 'react'
import { selectAllPosts } from '../../../../../../services/post/reducers/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { useParams } from 'react-router-dom'
import { UserPostCard } from '../../../../../societies'
import { getPostsUserDownvoted } from '../../../../../../services/post/actions/interactions/getPostsUserDownvoted'

const Downvote = ({profileOptions}) => {
  const allPosts = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const currentUser = getCurrentUser()
    const {id} = useParams()

    const downvotedPostByUser = () => {
      const payload = {
        options: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}`,
          },
        },
        userUid: id ? id : currentUser.userUid

      }

      dispatch(getPostsUserDownvoted(payload))
    }

    useEffect(() => {
      downvotedPostByUser()
  }, [dispatch, id])

  return (
    <article className="downvote-feed">
      {allPosts.map(post => {
            return <UserPostCard options={profileOptions} key={post._id} posts={post} />
      })}
    </article>
  )
}

export default Downvote
