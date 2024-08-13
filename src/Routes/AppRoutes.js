import React from 'react';
import { Route, Routes } from "react-router-dom"
import Home from "../Components/Home";
import Login from "../Components/Login";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/Login" element={<Login/>} />
            </Routes>
        </div>
    );
};

export default AppRoutes;