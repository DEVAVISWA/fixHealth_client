import React from 'react'

function Physio() {
  const user = window.localStorage.getItem('user')
  const userJson = JSON.parse(user)
  const token = window.localStorage.getItem('token')
  return (
    <div>
      hello {userJson.name}
    </div>
  )
}

export default Physio