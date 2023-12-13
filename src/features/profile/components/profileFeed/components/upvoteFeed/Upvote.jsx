import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllPosts } from '../../../../../../services/post/reducers/postSlice'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { UserPostCard } from '../../../../../societies'
import { getPostUserUpvoted } from '../../../../../../services/post/actions/interactions/getPostUserUpvoted'

const Upvote = ({profileOptions}) => {
  const allPosts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()
  const {id} = useParams()

  const upvotedPostsByUser = () => {
    const payload = {
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}
          `,
        },
      },
      userUid: id ? id : currentUser.userUid
    }

    dispatch(getPostUserUpvoted(payload))
  }

  useEffect(() => {
    upvotedPostsByUser()
  }, [dispatch, id])

  return (
    <article className="upvote-feed">
      {allPosts.map(post => {
            return <UserPostCard options={profileOptions} key={post._id} posts={post} />
      })}
    </article>
  )
}

export default Upvote
