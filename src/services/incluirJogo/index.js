import api from "..";

export const pegarGeneros = async() => {
  return await api.get(`generos/`);
}

export const pegarPlataformas = async() => {
  return await api.get(`plataformas/`);
}

export const criarJogo = async(body, token)=>{
  let config={
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }
  return await api.post(`jogos`,body, config);
}