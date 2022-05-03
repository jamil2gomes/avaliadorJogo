import { Links } from "components/Popover"

export type Notas = { label:string, value:number, valueB?:number}
export type ConteudoModal = { titulo: string, conteudo: string, link: Links }

export type NotasDoUsuario = {
  id: number;
  audio: number;
  feedback: number;
  cores: number;
  interface: number;
  media: string;
  'Usuario.Comentarios.id':number;
  'Usuario.Comentarios.descricao':string;
}