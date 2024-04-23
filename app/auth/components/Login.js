import React, { useState } from 'react';
import login from '@/app/db/auth/login';
import { useRouter } from 'next/navigation';

const Login = ({change}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault()

    const { result, error } = await login(email, password);

    if (error) {
        return console.log(error)
    }

    const uid = result.user
    // else successful
    console.log(uid)
    return router.push(`/user/${1}/profile`)
}

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleForm} className="form">
        <label htmlFor="email">
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
        </label>
        <label htmlFor="password">
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
        </label>
        <button type="submit">Sign up</button>
    </form>
    <a onClick={change}>Changer de composants</a>
</>
  )
}

export default Login;