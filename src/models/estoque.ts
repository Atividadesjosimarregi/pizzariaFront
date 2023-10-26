export class Estoque{
    id!:number;
    preco!:number;
    nome!:string;
    quantidade!: number;


    public setId(id: number){
        this.id = id;
    }
    public setPrecoProdutos(preco: number){
        this.preco = preco;
    }
    public setNomeProduto(nome: string){
        this.nome = nome;
    }

    public setQuantidade(quantidade: number){
        this.quantidade = quantidade;
    }
}


