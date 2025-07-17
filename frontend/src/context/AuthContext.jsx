import { createContext,useContext,useState } from "react";
const AuthContext=createContext()
export const AuthProvider=({children})=>{
const [user,setUser]=useState(null)
const [token,setToken]=useState(null)
const login=(userData,accessToken)=>{
   setUser(userData)
   setToken(accessToken)
};
const logout=()=>{
    setUser(null)
    setToken(null)
};
return(
    <AuthContext.Provider value={{user,token,login,logout}}>
    {children}
    </AuthContext.Provider>
);
};
export const useAuth=()=>useContext(AuthContext)