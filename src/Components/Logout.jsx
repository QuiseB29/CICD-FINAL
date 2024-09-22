import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

// handle logout submission
function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        localStorage.removeItem('userSession');

        setUser({ name: '', isLoggedIn: false });

        navigate('/')
    }, [navigate, setUser]);

    return (
        <div>Logging Out.....</div>
    );
};

export default Logout;