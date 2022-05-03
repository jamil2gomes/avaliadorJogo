import {Routes, Route, Navigate } from "react-router-dom";

// PAGES
import App from "App";
import Home from "pages/Home";
import Detalhes from "pages/Detalhes";
import IncluirJogo from "pages/IncluirJogo";

import Login from "pages/Login";
import TermosDeUso from "pages/TermosDeUso";
import { AuthProvider } from "Auth/AuthProvider";
import RequireAuth from "Auth/RequireAuth";
import PoliticaPrivacidade from "pages/PoliticaDePrivacidade";

const Rotas = () => {


    return (
       <AuthProvider>
            <Routes>
                   <Route path="/" element={<App />}/>
                    <Route index element={<Home />} />
                    <Route path="detalhes/:id" element={<Detalhes />} />
                    
                    <Route path="/incluir/jogo" 
                    element={
                        <RequireAuth>
                            <IncluirJogo/>
                        </RequireAuth>
                    } />  
                    <Route path="login" element={<Login/>} />
                    <Route path="terms" element={<TermosDeUso/>} />
                    <Route path="privacy" element={<PoliticaPrivacidade/>} />
                    <Route path="*" element={<Navigate to="/" replace />} />      
            </Routes>    
       </AuthProvider>
    );
}

export default Rotas;