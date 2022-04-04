import axios from "axios";


const api = axios.create({
    baseURL: 'https://avaliador-jogos.herokuapp.com',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        "Accept": "application/json"    
    },
    timeout: 5000
});

export default api;