import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const guestAuth = (Component) => {
    const WithAuthComponent = (props) => {
        const userId = useSelector((state) => state.user.id);

        debugger;
        if (userId) return <Navigate to="/login" />
        else return <Component {...props} />;
    }

    return WithAuthComponent;
};

export default guestAuth;