import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const handleSubmit = e => {
        e.preventDefault()
        fetch("http://localhost:5000/auth/register", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({username, email, password})
        }).then(response => response.json())
            .then(data => {
                alert(data.message)
                if (data.payload.code === 201) {
                    nav("/login")
                }
            })
            .catch(error => alert(error.message))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type={"text"} placeholder={"Username"} value={username} onChange={e => setUsername(e.target.value)}/>
                <br/>
                <input type={"email"} placeholder={"Email"} value={email} onChange={e => setEmail(e.target.value)}/>
                <br/>
                <input type={"password"} placeholder={"Password"} value={password} onChange={e => setPassword(e.target.value)}/>
                <br/>
                <input type={"submit"} value={"Register"} onClick={handleSubmit}/>
            </form>
            <p><Link to={"/login"}>Login</Link></p>
        </div>
    )
}

export default Register;