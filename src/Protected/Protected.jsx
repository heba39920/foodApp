
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';

export default function Protected({children}) {
const {userData} = useAuthContext();
  return localStorage.getItem("token")|| userData ? children : <Navigate to={"/login"}/>;
}