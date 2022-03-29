import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import { AuthContext } from "./AuthContext";


const RequireAuth = ({children}:{children:JSX.Element})=>{
    const {usuario} = useContext(AuthContext);
    let location = useLocation();

    if(!usuario){
        return <Login location={location.pathname}/>;
    }
    return children;
}

export default RequireAuth;