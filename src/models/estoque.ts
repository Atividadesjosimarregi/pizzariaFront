export class Estoque{
    id!:number;
    preco!:number;
    nome!:string;


    public setId(id: number){
        this.id = id;
    }
    public setPrecoProdutos(preco: number){
        this.preco = preco;
    }
    public setNomeProduto(nome: string){
        this.nome = nome;
    }
}


