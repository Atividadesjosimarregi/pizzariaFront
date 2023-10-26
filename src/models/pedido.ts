import { Status } from "src/enum/status";
import { Cliente } from "./cliente";
import { Pizza } from "./pizza";
import { Produto } from "./produto";
import { Funcionario } from "./funcionario";
import { Estoque } from "./estoque";

export class Pedido{
    id!:number;
    observacoes?:string;
    cliente: Cliente = new Cliente;
    preco?:number;
    pizzas: Pizza[] = [];
    estoque!: Estoque[];
    entrega?:boolean;
    delivery?:boolean;
    cancelado?:boolean;
    pagamentoCartao?:boolean;
    pagamentoDinheiro?: boolean;
    cadastro?:Date;
    funcionario: Funcionario = new Funcionario;

}   