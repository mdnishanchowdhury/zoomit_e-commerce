import { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProvider';

function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}

export default useAuth