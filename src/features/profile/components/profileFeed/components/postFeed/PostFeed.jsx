import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts } from '../../../../../../services/post/reducers/postSlice'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { useParams } from 'react-router-dom'
import { getPostsByUser } from '../../../../../../services/user/actions/getPostsByUser'
import { UserPostCard } from '../../../../../societies'

const PostFeed = ({profileOptions}) => {
    const allPosts = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const currentUser = getCurrentUser()
    const {id} = useParams()

    const postsByUser = () => {
        try{
    
          const payload = {
            options: {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.userToken}
                `,
              },
            },
            _id: id ? id : currentUser.userUid
    
          }
    
          dispatch(getPostsByUser(payload))
        }
    
        catch(error){
          console.log(error)
        }
    }

    useEffect(() => {
        postsByUser()
    }, [dispatch, id])

  return (
    <article className="post-feed">
       {allPosts.map(post => {
            return <UserPostCard options={profileOptions} key={post._id} posts={post} />
        })}
    </article>
  )
}

export default PostFeed
