import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { SET_USER } from 'store/actions';
import internalFetch from 'utils/fetch';

const withAuth = (Component) => {
    const WithAuthComponent = (props) => {
        const dispatch = useDispatch();
        const userId = useSelector((state) => state.user.id);
        const [loading, setLoading] = useState(true);

        const me = async () => {
            try {
                setLoading(true);
                const response = await internalFetch(`auth/me`, {
                    method: 'GET',
                    includeCredentials: true,
                })
                const { name, surname, email, picture, _id: id } = response.data;
                dispatch({ type: SET_USER, name, surname, email, avatar: picture, id });
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        useLayoutEffect(() => {
            me();
        }, []);

        if (loading) return <span>loading...</span>
        if (userId) {
            return <Component {...props} />;
        } else {
            return <Navigate to="/login" />;
        }
    }

    return WithAuthComponent;
};

export default withAuth;