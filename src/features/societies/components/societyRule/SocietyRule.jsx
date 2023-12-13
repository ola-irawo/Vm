import React from 'react'
import "./society-rule.css"
import Button from '../../../../components/ui/Button'
import { useWindowWidth } from '../../../landing'
import { useParams } from 'react-router-dom'
import { getSoceityStatus, selectSocietyById } from '../../../../services/societies/reducers/societySlice'
import { useDispatch, useSelector } from 'react-redux'
import { joinSociety } from '../../../../services/societies/action/joinSociety'
import { getCurrentUser } from '../../../../libs/getCurrentUser'

const SocietyRule = ({setShowSocietyRule, societyId}) => {
    const {screenWidth} = useWindowWidth()
    const dispatch = useDispatch()
    const societyStatus = useSelector(getSoceityStatus)
    const id = useSelector(state => selectSocietyById(state, societyId))
    const currentUser = getCurrentUser()

    const isMobile = screenWidth <= 767

    const handleJoinSociety = () => {
        try{
            const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${currentUser.userToken}
                  `,
                },
                body: JSON.stringify({societyId, userId: currentUser.userUid})
              }
              console.log("joinning")
              dispatch(joinSociety(options))
        }
        catch(error){
            console.log(error)
        }
        // finally{
        //     societyStatus = "idle"
        // }
    }
  return (
    <section className="society-rule-container">
        <article className="society-rule-article">
            
            {screenWidth <= 1029 && <h2 className="society-name">{societyId.societyName}</h2>}
            <h3 className="society-rule-header">By clicking “Join Society” button, you agree to the following rules:</h3>

           <ul className="society-rule-list">
                <li className="society-rule-item">
                    <p>1. Respect and Empathy: Members must show respect and empathy towards one another, recognizing that each person's experiences are unique.</p>
                </li>
                <li className="society-rule-item">
                    <p>2. Confidentiality: Any information shared within the society should be kept confidential. Members should respect each other's privacy.</p>
                </li>
                <li className="society-rule-item">
                    <p>3. Non-Judgment: There should be a non-judgmental and supportive atmosphere. Members should avoid criticizing or passing judgment on others.</p>
                </li>
                <li className="society-rule-item">
                    <p>4. Inclusivity: All individuals, regardless of their background or experiences, should be welcomed and included in the society.</p>
                </li>
                <li className="society-rule-item">
                    <p>5. No Harmful Advice: Members should refrain from providing medical or therapeutic advice. It's important to seek professional guidance when necessary.</p>
                </li>
                <li className="society-rule-item">
                    <p>6. Constructive Sharing: Members should aim to share their experiences and insights in a constructive and helpful way, focusing on personal growth and recovery.</p>
                </li>
                <li className="society-rule-item">
                    <p>7. No Promotions: Self-promotion or advertising unrelated to the society's purpose is generally not allowed.</p>
                </li>
                <li className="society-rule-item">
                    <p>8.  Mutual Support: Members should offer support to those who are struggling, but they should also seek support when needed.</p>
                </li>
                <li className="society-rule-item">
                    <p>9 .Open-Mindedness: Members should keep an open mind and be willing to learn from others' experiences, even if they differ from their own.</p>
                </li>
                <li className="society-rule-item">
                    <p>10. Dispute Resolution: Any conflicts or disputes should be resolved in a respectful and peaceful manner, with mediation if necessary.</p>
                </li>
                <li className="society-rule-item">
                    <p>11. Safety Concerns: If a member expresses thoughts of self-harm or harm to others, it should be reported to appropriate authorities.</p>
                </li>
                <li className="society-rule-item">
                    <p>12. Compliance with Laws: All members must adhere to relevant laws and regulations. Harmful or illegal activities are not condoned.</p>
                </li>
           </ul>
            
           

        </article>

        <div className="society-rule-btn-container">
            <Button 
                text={"Join Society"} 
                className={"join-btn"}
                handleEvent={() => handleJoinSociety()}
            />

            <Button 
                text={"Not now"} 
                className={"close-society-modal"} 
                handleEvent={() => setShowSocietyRule(false)} 
            />
        </div>
      
    </section>
  )
}

export default SocietyRule
