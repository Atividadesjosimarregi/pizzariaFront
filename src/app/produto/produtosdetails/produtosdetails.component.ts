import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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

  estoques: Estoque[] = []; 
  

  produtoService = inject(ProdutoService);

  constructor(){

    this.produtoService.getAvailableEstoques().subscribe( estoques => {
      this.estoques = estoques;
    })
  }

  salvar() {
    if (this.produto.id > 0) {
      this.produtoService.edita(this.produto).subscribe({
        next: pizza => {
          this.retorno.emit(this.produto);
          this.produto.id = 0;
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else {
      this.produtoService.cadastra(this.produto).subscribe({
        next: produto => {
          this.retorno.emit(produto);
          console.log("deu bom");
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });

    }

  }


  deletar(){
    this.produtoService.deleta(this.produto.id).subscribe({
      next: produto =>{
          this.retorno.emit(produto);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    })
  }

}
