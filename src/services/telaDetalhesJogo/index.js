import api from "../index";


export const pegarDetalhesDoJogoPelo = async(id) => {
    return await api.get(`jogos/${id}`);
}