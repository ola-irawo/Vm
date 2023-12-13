import React, { useEffect } from 'react'
import Button from '../../../../components/ui/Button'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../actions/authAction'

const Logout = () => {
    const dispatch = useDispatch()

    const logUserOut = () => {
        console.log("logging out")
        dispatch(logoutAction())
    }

    useEffect(() => {
      logUserOut()
    }, [dispatch])
  return (
    <div>
      {/* <img src={logoutIcon} alt="logout user" /> */}
      <Button text={"logoutIcon"} handleEvent={logUserOut} />
    </div>
  )
}

export default Logout
