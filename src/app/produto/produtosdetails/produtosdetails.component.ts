import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { EstoqueService } from 'src/Services/estoque.service';
import { ProdutoService } from 'src/Services/produto.service';
import { Estoque } from 'src/models/estoque';
import { Produto } from 'src/models/produto';

@Component({
  selector: 'app-produtosdetails',
  templateUrl: './produtosdetails.component.html',
  styleUrls: ['./produtosdetails.component.scss']
})
export class ProdutosdetailsComponent {

 
  @Input() produto: Produto = new Produto();
  @Output() retorno = new EventEmitter<Produto>();

  produtosService = inject(ProdutoService);
  estoqueProdService = inject(EstoqueService);
  
  estoqueProdLista: Estoque[] = [];

  constructor(){
  
  }

  salvar(){
    console.log('Dados a serem enviados para o servidor:', {
      estoqueProds: JSON.stringify(this.produto.estoques),
      quantidadeprod: this.produto.quantidade
    });

    const estoquePRodSelecionado = this.estoqueProdLista.find(estoqueProd => estoqueProd.id === this.produto.estoques.id);

    if(estoquePRodSelecionado){
      this.produto.estoques = estoquePRodSelecionado;
    }

    if(this.produto.id > 0){
      this.produtosService.edita(this.produto).subscribe({
        next: produto => {
          this.retorno.emit(this.produto);
          alert('Produto Editado!!');
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else{
      this.produtosService.cadastra(this.produto).subscribe({
        next: produto => {
          this.retorno.emit(produto);
          alert('Produto Selecionado no Pedido!!');
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });
    }
  }

  ngOnInit() {
    this.estoqueProdService.list().subscribe((estoqueProd: Estoque[]) => {
      this.estoqueProdLista = estoqueProd;
    })
  }

  deletar(){
    this.produtosService.deleta(this.produto.id).subscribe({
      next: produto => {
        this.retorno.emit(produto);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }

}
