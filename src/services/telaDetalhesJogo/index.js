import api from "../index";


export const pegarDetalhesDoJogoPelo = async(id) => {
    return await api.get(`jogos/${id}`);
}

export const pegarMediaDeAvaliacaoDoJogo = async(id) => {
    return await api.get(`jogos/${id}/avaliacao`);
}

export const pegarMediaDeAvaliacaoDoJogoPorPlataformas = async(id) => {
    return await api.get(`jogos/${id}/avaliacao/plataformas`);
}

export const pegarAvaliacaoDoJogoDoUsuario = async(idJogo, idUsuario) => {
    return await api.get(`jogos/${idJogo}/avaliacao/usuario/${idUsuario}`);
}