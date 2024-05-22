"use client"

import React, {useState} from 'react'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';


export default function Auth() {
  const [switchForm, setSwitchForm] = useState(false);

  const handleSwitch = () => {
    setSwitchForm(!switchForm)
  }
  return (
    <div className='my-20'>
      {switchForm ?
        <LoginForm change={handleSwitch} />
        :
        <SignupForm change={handleSwitch} />
      }
    </div>
  )
}
