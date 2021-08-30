import { Lote } from "./Lote";
import { RedeSocial } from "./RedeSocial";
import { Palestrante } from "./Palestrante";

export class Evento 
{
    
    constructor() 
    {
        
    }
    
    id: number; 
    local: string;
    dataEvento: Date;
    tema: string;
    qtdPessoas: number; 
    imageURL: string;
    telefone: string; 
    email: string;
    lotes: Lote[]; 
    redesSocials: RedeSocial[]; 
    palestranteEvento: Palestrante[]; 
}
