import React, { useEffect, useState } from 'react'
import "./society-page.css"
import UserPostCard from '../../../../components/postCards/UserPostCard'
import BrandLogo from '../../../../components/brandLogo/BrandLogo'
import { useWindowWidth } from '../../../landing'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import SocietyWidget from '../societyWidget/SocietyWidget'
import PostButton from '../../../../components/postButton/PostButton'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import { getSocietyPosts } from '../../../../services/societyPost/actions/getSocietyPosts'
import PostModal from '../../../../components/ui/postModal/PostModal'
import { selectSocietyPosts } from '../../../../services/societyPost/reducers/societyPostSlice'
import SocietyRule from '../societyRule/SocietyRule'

const SocietyPage = () => {
    const [showSocietyRule, setShowSocietyRule] = useState(true)
    const {screenWidth} = useWindowWidth()
    const currentUser = getCurrentUser()
    const dispatch = useDispatch()
    const isMobile = screenWidth <= 767
    const {id} = useParams()
    const allSocietyPosts = useSelector(selectSocietyPosts)
    const [showPostModal, setShowPostModal] = useState(false)
    const location = useLocation()
    const societyId = location.state.id

    const options = [
      {label: `Copy Link`, action:  () =>  console.log("link")},
      {label: `Mute @`, action:  () =>  console.log("mute")},
      {label: `Block @`, action: () =>  console.log("block")},
      {label: `Report Post`, action:() => console.log("report")},
      // {label: `Delete Post`, action:() => console.log("report")},
    ]

    const fetchSocietyPosts = () => {
      const payload = {
        options : {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}
            `,
          },
        },
        societyId
      }

      dispatch(getSocietyPosts(payload))

    }

    useEffect(() => {
      fetchSocietyPosts()
    }, [id])

  return (
    <section className='society-page-section'>
      {isMobile && <BrandLogo />}

      <div className="society-page-wrapper">
        {showSocietyRule 
          ? 
          <SocietyRule societyId={societyId} setShowSocietyRule={setShowSocietyRule} />
          :
        <article className='society-page-article'>
          {allSocietyPosts.map(society => {
            return <UserPostCard key={society._id} posts={society} options={options} />
          })}

          { showPostModal && <PostModal setShowPostModal={setShowPostModal} id={societyId}  />}
          <PostButton id={id} setShowPostModal={setShowPostModal} />
        </article>}

        { screenWidth >= 1030 && <SocietyWidget id={id} />}
      </div>
    </section>
  )
}

export default SocietyPage
