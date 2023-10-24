import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstoqueService } from 'src/Services/estoque.service';
import { Estoque } from 'src/models/estoque';

@Component({
  selector: 'app-estoquelist',
  templateUrl: './estoquelist.component.html',
  styleUrls: ['./estoquelist.component.scss']
})
export class EstoquelistComponent {

  lista: Estoque[] = [];

  estoqueSelecionadoParaEdicao: Estoque = new Estoque();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  estoqueService = inject(EstoqueService);

  constructor(){

    this.list();


  }



      abrirModal(abc : any){
        this.modalService.open(abc, {size: 'lg'});
      }

    addNaLista(estoque: Estoque){

      this.lista.push(estoque);
      this.modalService.dismissAll();

    }

    list() {

      this.estoqueService.list().subscribe({
        next: lista => { 
          this.lista = lista;
        },
        error: erro => { 
          alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
          console.error(erro);
        }
      });
  
    }
  
    exemploErro() {
  
      this.estoqueService.exemploErro().subscribe({
        next: lista => { 
          this.lista = lista;
        },
        error: erro => { 
          alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
          console.error(erro);
        }
      });
  
    }
  
  
    adicionar(modal: any) {
      this.estoqueSelecionadoParaEdicao = new Estoque();
  
      this.modalService.open(modal, { size: 'sm' });
    }
  
    editar(modal: any, estoque: Estoque, indice: number) {
      this.estoqueSelecionadoParaEdicao = Object.assign({}, estoque); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
      this.indiceSelecionadoParaEdicao = indice;
  
      this.modalService.open(modal, { size: 'sm' });
    }
  
    addOuEditarEstoque(estoque: Estoque) {
  
      this.list();
  
      /*
  
      if (this.pessoaSelecionadaParaEdicao.id > 0) { //MODO EDITAR
        this.lista[this.indiceSelecionadoParaEdicao] = pessoa;
      } else {
        pessoa.id = 99;
        this.lista.push(pessoa);
      }
      */
  
      this.modalService.dismissAll();
  
    }

    deleteEstoque(id: number) {
      if (confirm('Tem certeza de que deseja excluir este item?')) {
        this.estoqueService.deleta(id).subscribe(
          () => {
            
            this.list();
            
          },
          (error) => {
            console.error('Erro ao excluir o item.', error);
            
          }
        );
      }

    }

}
