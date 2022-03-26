export interface JogoResumo {
    imagem_url: string;
    nome:string;
    data_lancamento: Date;
    id:number;
}

export interface DetalhesJogo{
    id: number;
    nome:string;
    sinopse:string;
    data_lancamento:string;
    desenvolvedora:string;
    imagem_url:string;
    Generos:Genero[],
    Plataformas: Plataforma[]
}

export interface Genero{
    id: number;
    descricao: string;
}

export interface Plataforma{
    id: number;
    descricao: string;
}

