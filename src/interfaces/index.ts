export interface JogoResumo {
    imagem_url: string;
    nome:string;
    data_lancamento: Date;
    id:number;
}

export interface MediaGeralJogo{
    media: number;
    quantidaAvaliacoes: number;
    medias:{
        Audio:number;
        Feedback: number;
        Cores: number;
        Interface: number;
    }
}

export interface Comentarios {
    id:number;
    descricao:string;
    createdAt:string
    Usuario:{
        nome:string
    }
}

export interface MediasPorPlataforma{
    media: number;
    Plataforma:{descricao:string;};
    audio:string;
    feedback: string;
    cores: string;
    interface: string;
}

export interface DetalhesJogo{
    id: number;
    nome:string;
    sinopse:string;
    data_lancamento:string;
    desenvolvedora:string;
    imagem_url:string;
    jogo_url:string;
    Generos:Genero[],
    Plataformas: Plataforma[];
}



export interface Genero{
    id: number;
    descricao: string;
}

export interface Comentario{
    id: number;
    descricao: string;
    createdAt:string;
    Usuario:{
        nome:string;
    }
}

export interface Plataforma{
    id: number;
    descricao: string;
}

export interface Usuario{
    id:number;
    nome:string;
    nickname:string;
    role:string;
    token:string;
    
}

export interface OptionProp {
    value: number;
    label: string;
}

export interface GeneroPlataformaRequest{
   id:number;
   descricao:string;
}

