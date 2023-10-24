import { Tamanho } from "src/enum/tamanho";
import { Sabor } from "./sabor";

export class Pizza{
    id!:number;
    sabor!:Sabor;
    preco!:number;
    quantidade!:number;
    tamanho!:Tamanho;
}