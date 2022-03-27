import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import App from "../App";
import Home from "../pages/Home";
import Detalhes from "../pages/Detalhes";
import IncluirJogo from "../pages/IncluirJogo";
import Avaliacao from "../pages/Avaliacao";
import Login from "../pages/Login";

const Rotas = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="detalhes/:id" element={<Detalhes />} />
                    <Route path="avaliar/:id" element={<Avaliacao />} />
                    <Route path="incluir/jogo" element={<IncluirJogo />} />
                </Route>
                <Route path="login" element={<Login />}/>
                <Route path="cadastrar" element={<Login />}/>
            </Routes>    
        </BrowserRouter>
    );
}

export default Rotas;