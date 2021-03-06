import api from "..";

export const realizarLogin = async(email, senha) => {
    const body = {
        email:email,
        senha:senha
    }
    return await api.post('usuario/login',body);
}

export const realizarCadastro = async(nome, email, senha) => {
    const body = {
        email:email,
        senha:senha,
        nome:nome,
    }
    return await api.post('usuario',body);
}

export const loginGoogle = async(nome, email, googleId) => {
    const body = {
        email,
        googleId,
        name:nome,
    }
    return await api.post('usuario/login/google',body);
}
