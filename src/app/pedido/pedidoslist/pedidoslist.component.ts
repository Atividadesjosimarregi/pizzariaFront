import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from 'src/Services/pedido.service';
import { Pedido } from 'src/models/pedido';

@Component({
  selector: 'app-pedidoslist',
  templateUrl: './pedidoslist.component.html',
  styleUrls: ['./pedidoslist.component.scss']
})
export class PedidoslistComponent {

  lista: Pedido[] = [];

  pedidoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  pedidoService = inject(PedidoService);

  constructor(){

    this.list();


  }



      abrirModal(abc : any){
        this.modalService.open(abc, {size: 'lg'});
      }

    addNaLista(pedido: Pedido){

      this.lista.push(pedido);
      this.modalService.dismissAll();

    }

    list() {

      this.pedidoService.list().subscribe({
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
  
      this.pedidoService.exemploErro().subscribe({
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
      this.pedidoSelecionadoParaEdicao = new Pedido();
  
      this.modalService.open(modal, { size: 'lg' });
    }
  
    editar(modal: any, pedido: Pedido, indice: number) {
      this.pedidoSelecionadoParaEdicao = Object.assign({}, pedido); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
      this.indiceSelecionadoParaEdicao = indice;
  
      this.modalService.open(modal, { size: 'lg' });
    }
  
    addOuEditarPedido(pedido: Pedido) {
  
      this.list();
  
     
  
      this.modalService.dismissAll();
  
    }

    deletePedido(id: number) {
      if (confirm('Tem certeza de que deseja excluir este sabor?')) {
        this.pedidoService.deleta(id).subscribe(
          () => {
            
            this.list();
            
          },
          (error) => {
            console.error('Erro ao excluir o pedido.', error);
            
          }
        );
        
}
    }
  }
