import React from 'react'

const Button = ({className, type, text, handleEvent}) => {
  return (
   <button onClick={handleEvent} className={className} type={type}>
    {text}
   </button>
  )
}

export default Button
