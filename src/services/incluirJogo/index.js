import api from "..";

export const pegarGeneros = async() => {
  return await api.get(`generos/`);
}

export const pegarPlataformas = async() => {
  return await api.get(`plataformas/`);
}