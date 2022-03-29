import api from "..";

export const realizarLogin = async(email, senha) => {
    const body = {
        email:email,
        senha:senha
    }
    return await api.post('/usuario/login',body);
}

export const realizarCadastro = async({nome, email, senha, nickname}) => {
    const body = {
        email:email,
        senha:senha,
        nome:nome,
        nickname:nickname,
    }
    return await api.post('/usuario',body);
}
