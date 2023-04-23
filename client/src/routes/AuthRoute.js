/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";


const AuthRoute = ({ children, to, }) => {
    const isAuth = useAuth();

    if (!isAuth) return <Navigate to={to || "/login"} />;

    // authorized so return child components
    return children;
};

export default AuthRoute;
