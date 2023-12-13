import React, { useEffect, useState } from 'react'
import "./societies-list.css"
import societyImage from "../../assets/images/society.png"
import { useDispatch, useSelector } from 'react-redux'
import { selectUserById } from '../../../../services/user/reducers/userSlice'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import { getUserJoinedSocieties, selectAllSociety } from '../../../../services/societies/reducers/societySlice'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { getUserSocieties } from '../../../../services/societies/action/getUserSocieties'

const SocietiesList = () => {
      
  const allSocieties = useSelector(selectAllSociety)
  const userJoinedSocieties = useSelector(getUserJoinedSocieties)
  const [filteredSocieties, setFilteredSocieties] = useState([]);
  const currentUser = getCurrentUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const filtered = allSocieties.filter(society =>
      userJoinedSocieties.every(joinedSociety => joinedSociety._id !== society._id)
    );
    setFilteredSocieties(filtered);
  }, [allSocieties, userJoinedSocieties])
  
  const userSocities = () => {
    const payload = {
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}
          `,
        },
      },
      userUid: currentUser.userUid
    }

    dispatch(getUserSocieties(payload))
  }

  useEffect(() => {
    userSocities()
  }, [])

  return (
    <section className="society-container">
        <article className="societies-list-wrapper">
            <h2>Societies I joined</h2>

            <ul className="societies-list">
              {userJoinedSocieties.map(society => {
                return <li 
                  className="societies-list-item"
                  key={society._id}
                  onClick={() => navigate(`/societies/${society.societyName}`,  {state: {id: society._id}})}
                >
                    <div className="societies-list-image">
                        <img src={societyImage} alt="society" />
                    </div>
                    <div className="societies-list-text">
                        <h3>{society.societyName}</h3>
                        <small>{society?.societyMembers?.length}</small>
                    </div>
                  </li>
              })}
            </ul>
          </article>
            
          <article className="societies-list-wrapper">
            <h2>Other societies you can join</h2>

            <ul className="societies-list">
              {filteredSocieties.map(society => {
                  return <li 
                    className="societies-list-item"
                    key={society._id}
                    onClick={() => navigate(`/societies/${society.societyName}`, {state: {id: society._id}})}
                  >
                    <div className="societies-list-image">
                        <img src={societyImage} alt="society" />
                    </div>
                    <div className="societies-list-text">
                        <h3>{society.societyName}</h3>
                        <small>{society?.societyMembers?.length}</small>
                    </div>
                  </li>
              })}
            </ul>
        </article>
      {/* <Outlet /> */}
    </section>
  )
}

export default SocietiesList
