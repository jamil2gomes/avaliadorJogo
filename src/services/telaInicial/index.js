import api from "../index";


export const pegarTodosJogos = async() => {
    return await api.get('jogos/');
}

export const pegarDetalhesJogo = async(id) => {
    return await api.get(`jogos/${id}`);
}