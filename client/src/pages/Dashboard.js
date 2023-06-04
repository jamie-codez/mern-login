import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const nav = useNavigate();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("authenticated")
        console.log(isAuthenticated)
        if (isAuthenticated) {
            setIsLoggedIn(true)
        }

    }, [isLoggedIn, nav])
    return (<div>
            {isLoggedIn ? <div>
                <p>Dashboard</p>
            </div> : nav("/login")}
        </div>
    )
}

export default Dashboard