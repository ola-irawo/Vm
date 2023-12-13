import React from 'react'
import "./society-widget.css"
import { useDispatch, useSelector } from 'react-redux'
import { selectAllSociety, selectSocietyById } from '../../../../services/societies/reducers/societySlice'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import { useParams } from 'react-router-dom'
import societyImg from './societyImg.png'
import Button from '../../../../components/ui/Button'

const SocietyWidget = ({id}) => {
    const userJoinedSocieties = useSelector(selectAllSociety)
    const currentUser = getCurrentUser()
    const dispatch = useDispatch()

    // const societyId = useSelector(state => selectSocietyById(state, id))

    console.log(id)
  return (
    <aside className="society-widget">
      <div className="society-widget-wrapper">
        <div className="society-widget-img">
          <img src={societyImg} alt="" />
        </div>

        <div className="society-widget-text">
          <h3>{id}</h3>
          <p>
            This society is here to help you be the best parent you can be. We are with you.
          </p>
        </div>
      </div>
      
      <div className="society-widget-btn-container">
        <Button text={"Chat with a Confindante"} className={"confidante-button"} />
        <Button text={"Exit Society"} className={"exit-society"} />
      </div>
    </aside>
  )
}

export default SocietyWidget
