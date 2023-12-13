import React from 'react'
import "./comment.css"
import Button from '../../../../ui/Button'

const Comment = () => {
  return (
    <Button
    className="comment-btn"
    text={
        <>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none">
                    <path d="M1 21L2.44332 16.1314C1.1959 14.057 0.744636 11.6004 1.17344 9.2184C1.60225 6.83639 2.88194 4.69107 4.77458 3.18131C6.66723 1.67155 9.04403 0.900098 11.4631 1.01038C13.8821 1.12066 16.1788 2.10518 17.926 3.78088C19.6733 5.45658 20.7523 7.70943 20.9623 10.1206C21.1724 12.5317 20.4992 14.937 19.068 16.8893C17.6368 18.8416 15.545 20.2081 13.1814 20.7345C10.8178 21.261 8.3434 20.9117 6.21816 19.7516L1 21Z" stroke="#111111" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>1</span>
            </div>
        </>
    }
    />
    
  )
}

export default Comment
