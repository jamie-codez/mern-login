import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'

const App = () => {
    return (
        <Routes>
            <Route path={"/"} exact element={<Register/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/register" exact element={<Register/>}/>
            <Route path="/home" exact element={<Dashboard/>}/>
        </Routes>
    )
}

export default App