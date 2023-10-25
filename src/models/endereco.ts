import { Cliente } from "./cliente";

export class Endereco{
    id!:number;
    rua!:string;
    bairro!:string;
    numero!:number;
    observacao!:string;
    cep!:string;
    cliente!:Cliente;
}