import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const handleSubmit = e => {
        e.preventDefault()
        fetch("http://localhost:5000/auth/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({email, password})
        }).then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    alert(data.message);
                    localStorage.setItem("authenticated", true)
                    localStorage.setItem("access_token", data.payload.access_token)
                    nav("/home")
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                alert(error)
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br/>
                <input type={"email"} placeholder={"Email"} value={email} onChange={e => setEmail(e.target.value)}/>
                <br/>
                <input type={"password"} placeholder={"Password"} value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <br/>
                <input type={"submit"} value={"Login"} onClick={handleSubmit}/>
            </form>
            <p><Link to={"/register"}>Register</Link></p>
        </div>
    )
}

export default Login;