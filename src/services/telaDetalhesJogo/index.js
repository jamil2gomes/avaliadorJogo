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

export const deletarAvaliacao = async(idJogo,idAvaliacao,token) => {
    let config={
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }
    return await api.delete(`/jogos/${idJogo}/avaliacao/${idAvaliacao}`, config);
  }

  export const editarAvaliacao = async(idJogo,idAvaliacao, body, token) => {
    let config={
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }
    return await api.put(`/jogos/${idJogo}/avaliacao/${idAvaliacao}`,body, config);
  }

  export const pegarComentarioDoUsuarioDaqueleJogo = async(idJogo, idUsuario) => {

    return await api.get(`/jogos/${idJogo}/comentarios/usuarios/${idUsuario}`);

  }