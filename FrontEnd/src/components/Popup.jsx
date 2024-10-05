import React, { useState } from 'react'

export default function Popup() {

    const [showpopup, setpopup] = useState(false)


    const logoutclick= ()=>{
           setpopup(true)
    }

    const ConfirmLogout = ()=>{
        setpopup(false)
    }

    const CancelLogout = ()=> {
        setpopup(false)
    }


  return (
    <>

    <div>

      <button onClick={logoutclick}>Logout</button>

      {showpopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Are you sure you want to logout?</h2>
            <button onClick={ConfirmLogout}>Yes</button>
            <button onClick={CancelLogout}>No</button>
          </div>
        </div>
      )}

    </div>    
    
    </>
  )
}
