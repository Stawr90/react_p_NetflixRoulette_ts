import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { useLog } from "../../components/loginForm/loginSlice";

const PrivateRoute = () => {
    const signIn = useSelector(useLog);

    return (
        signIn ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;