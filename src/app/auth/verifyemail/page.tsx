/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'

function verifyEmail() {
    const [token,setToken] = useState('')
    const [varified,setVerified] = useState(false)
    const [error, setError] = useState(false)
    
  return (
    <div>verifyEmail</div>
  )
}

export default verifyEmail