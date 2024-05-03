'use client'

import React, { useState } from "react"
import LoginForm from "./LoginForm";
import Signup from "./Signup";

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
                <Signup change={handleSwitch}/>
            }
        </>
    )

}

export default SwitchForm;