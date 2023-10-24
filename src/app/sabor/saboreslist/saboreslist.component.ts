import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaborService } from 'src/Services/sabor.service';
import { Sabor } from 'src/models/sabor';

@Component({
  selector: 'app-saboreslist',
  templateUrl: './saboreslist.component.html',
  styleUrls: ['./saboreslist.component.scss']
})
export class SaboreslistComponent {

  lista: Sabor[] = [];

  saborSelecionadoParaEdicao: Sabor = new Sabor();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  saborService = inject(SaborService);

  constructor(){

    this.list();


  }



      abrirModal(abc : any){
        this.modalService.open(abc, {size: 'lg'});
      }

    addNaLista(sabor: Sabor){

      this.lista.push(sabor);
      this.modalService.dismissAll();

    }

    list() {

      this.saborService.list().subscribe({
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
  
      this.saborService.exemploErro().subscribe({
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
      this.saborSelecionadoParaEdicao = new Sabor();
  
      this.modalService.open(modal, { size: 'sm' });
    }
  
    editar(modal: any, sabor: Sabor, indice: number) {
      this.saborSelecionadoParaEdicao = Object.assign({}, sabor); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
      this.indiceSelecionadoParaEdicao = indice;
  
      this.modalService.open(modal, { size: 'sm' });
    }
  
    addOuEditarSabor(sabor: Sabor) {
  
      this.list();
  
     
  
      this.modalService.dismissAll();
  
    }

    deleteSabor(id: number) {
      if (confirm('Tem certeza de que deseja excluir este sabor?')) {
        this.saborService.deleta(id).subscribe(
          () => {
            
            this.list();
            
          },
          (error) => {
            console.error('Erro ao excluir o sabor.', error);
            
          }
        );
      }

    }
    


}
