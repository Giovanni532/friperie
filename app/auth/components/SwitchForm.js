'use client'

import React, { useState } from "react"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const SwitchForm = () => {

    const [switchForm, setSwitchForm] = useState(false);

    const handleSwitch = () => {
        setSwitchForm(!switchForm)
    }

    return (
        <>
            {switchForm ?
                <LoginForm change={handleSwitch} />
                :
                <SignupForm change={handleSwitch}/>
            }
        </>
    )

}

export default SwitchForm;