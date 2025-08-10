import { useNavigate } from "react-router-dom"
const logout=()=>{
    localStorage.removeItem("accessToken")
}