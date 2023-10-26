import { Estoque } from "./estoque";

export class Produto {
    id!: number;
    quantidade!: number;
    precoProduto?: number;
    estoques: Estoque = new Estoque;

}
  