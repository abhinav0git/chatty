import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Chatbox/Chatbox";
import Landingpage from "./components/Mainpage/Mainpage";
import SignIn from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import { getToken } from "./helpers";

const AppRoutes = () => {
    const isAuthenticated = getToken();

    return (
        <Routes>
            <Route
                path="/"
                element={isAuthenticated ? <Navigate to="/profile" /> : <Landingpage />}
            />
            <Route
                path="/signin"
                element={isAuthenticated ? <Navigate to="/profile" /> : <SignIn />}
            />
            <Route
                path="/signup"
                element={isAuthenticated ? <Navigate to="/profile" /> : <SignUp />}
            />
            <Route
                path="/profile"
                element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />}
            />
        </Routes>
    );
};

export default AppRoutes;