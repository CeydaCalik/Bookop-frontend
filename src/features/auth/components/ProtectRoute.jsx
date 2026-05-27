import { Navigate } from "react-router";

export const ProtectRoute = ({ children }) => {

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to={"/"} />
    }

    return children;
}