import { RedeSocial } from "./RedeSocial";
//import { Palestrante } from "./Palestrante";

export interface Palestrante {
    id: number; 
    nome: string; 
    miniCurriculo: string;
    imagemURL: string;
    telefone: string;
    email: string;
    redesSociais: RedeSocial[];
    //palestrantesEventos: Palestrante[];
}
