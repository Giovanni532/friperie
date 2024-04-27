import React, { useState } from 'react';
import signup from '@/app/db/auth/signup';
import { useRouter } from 'next/navigation';
import addData from '@/app/db/request/addData';

const Signup = ({ change }) => {

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault()

        const { resultSignup, errorSignup } = await signup(email, password);

        if (errorSignup) {
            return console.log(errorSignup)
        }

        const uid = resultSignup.user.uid

        const data = {
            prenom,
            nom,
            email,
            uid
        }

        const {resultAddData, errorAddData} = await addData('user', uid, data)

        return router.push(`/user/${uid}/profile`)
    }

    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleForm} className="form">
            <label htmlFor="prenom">
                    <p>Prenom</p>
                    <input onChange={(e) => setPrenom(e.target.value)} required type="prenom" name="prenom" id="prenom" placeholder="Votre prenom" />
                </label>
                <label htmlFor="nom">
                    <p>Nom</p>
                    <input onChange={(e) => setNom(e.target.value)} required type="nom" name="nom" id="nom" placeholder="Votre nom" />
                </label>
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

export default Signup;