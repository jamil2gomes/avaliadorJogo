import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import App from "../App";
import Home from "../pages/Home";
import Detalhes from "../pages/Detalhes";
import IncluirJogo from "../pages/IncluirJogo";
import Avaliacao from "../pages/Avaliacao";

const Rotas = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="detalhes/:id" element={<Detalhes />} />
                    <Route path="avaliar/:id" element={<Avaliacao />} />
                    <Route path="incluir" element={<IncluirJogo />} />
                </Route>
            </Routes>    
        </BrowserRouter>
    );
}

export default Rotas;