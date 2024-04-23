'use client'

import React, { useState } from "react"
import Login from "./Login";
import Signup from "./Signup";

const SwitchForm = () => {

    const [switchForm, setSwitchForm] = useState(false);

    const handleSwitch = () => {
        setSwitchForm(!switchForm)
    }

    return (
        <>
            {switchForm ?
                <Login change={handleSwitch} />
                :
                <Signup change={handleSwitch}/>
            }
        </>
    )

}

export default SwitchForm;