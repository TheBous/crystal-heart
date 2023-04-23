import { useSelector } from "react-redux";

const useAuth = () => {
    const userId = useSelector((state) => state.user.id);
    const state = useSelector((state) => state);
    console.warn(state);
    const isAuthenticated = !!userId;

    return isAuthenticated;
};

export default useAuth;