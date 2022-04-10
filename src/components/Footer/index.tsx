import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer:React.FC = () => {
    return(
        
        <footer className="footer">
            
            <Link to="/terms" style={{ textDecoration:'none'}}><span style={{color:"white",}}>Termos de uso</span></Link>
            <Link to="/privacy"  style={{ textDecoration:'none'}}><span style={{color:"white"}}>Política de privacidade</span></Link>
        </footer>
    )
}

export default Footer;