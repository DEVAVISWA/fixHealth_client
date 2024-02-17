import React from 'react'

function Sales() {
  const user = window.localStorage.getItem('user')
  const userJson = JSON.parse(user)
  const token = window.localStorage.getItem('token')
  return (
    <div>Sales</div>
  )
}

export default Sales