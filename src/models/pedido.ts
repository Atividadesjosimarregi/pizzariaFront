import { Status } from "src/enum/status";
import { Cliente } from "./cliente";
import { Pizza } from "./pizza";
import { Produto } from "./produto";
import { Funcionario } from "./funcionario";

export class Pedido{
    id!:number;
    observacoes?:string;
    cliente!:Cliente;
    preco?:number;
    status!:Status;
    pizzas?:Pizza;
    produtos?:Produto;
    entrega?:boolean;
    delivery!:boolean;
    cancelado?:boolean;
    pagamentoCartao?:boolean;
    cadastro?:Date;
    funcionario?:Funcionario;

}   