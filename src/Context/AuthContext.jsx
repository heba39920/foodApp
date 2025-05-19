import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react'
    const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const [userData, setUserData] = useState(null);
    const saveData =()=>{
        const encodedUser = localStorage.getItem("token");
        try {
            const decodedUser = jwtDecode(encodedUser);
            console.log(decodedUser);
            setUserData(decodedUser);
            
        } catch (error) {
            console.log(error);
            
        }
    }
     useEffect(() => {
        if (localStorage.getItem("token")) {
          saveData();
        }
      }, []);
  return (
    <AuthContext.Provider value={{saveData,userData}}>
        {children}
      
    </AuthContext.Provider>
  )
}
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}