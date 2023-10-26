import { Endereco } from "./endereco";

export class Cliente{
    id!:number;
    nome!:string;
    enderecos?:Endereco[] = [];


    public setId(id: number){
        this.id = id;
    }
    public setNome(nome: string){
        this.nome = nome;
    }
    public setEndereco(enderecos: Endereco){
        this.enderecos = this.enderecos;
    }
}