import api from "..";

export const realizaAvaliacao = async(idJogo, body, token) => {
  let config={
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }
  return await api.post(`/jogos/${idJogo}/avaliacao/`,body, config);
}

export const pegarAvaliacaoDoJogoPeloUsuario = async(idUsuario, idJogo) => {

  return await api.get(`/jogos/${idJogo}/avaliacao/usuario/${idUsuario}`);
}

export const pegarPlataformasDadoJogo= async(idJogo) => {

  return await api.get(`/jogos/${idJogo}/plataformas`);
}

export const salvarComentario= async(idJogo, body, token) => {
  let config={
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }
  return await api.post(`/jogos/${idJogo}/comentarios`, body, config);
}
