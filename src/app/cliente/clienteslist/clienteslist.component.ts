import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/Services/cliente.service';
import { Cliente } from 'src/models/cliente';

@Component({
  selector: 'app-clienteslist',
  templateUrl: './clienteslist.component.html',
  styleUrls: ['./clienteslist.component.scss']
})
export class ClienteslistComponent {

  lista: Cliente[] = [];

  clienteSelecionadoParaEdicao: Cliente = new Cliente();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  clienteService = inject(ClienteService);

  constructor(){

    this.list();


  }



      abrirModal(abc : any){
        this.modalService.open(abc, {size: 'lg'});
      }

    addNaLista(cliente: Cliente){

      this.lista.push(cliente);
      this.modalService.dismissAll();

    }

    list() {

      this.clienteService.list().subscribe({
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
  
      this.clienteService.exemploErro().subscribe({
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
      this.clienteSelecionadoParaEdicao = new Cliente();
  
      this.modalService.open(modal, { size: 'sm' });
    }
  
    editar(modal: any, cliente: Cliente, indice: number) {
      this.clienteSelecionadoParaEdicao = Object.assign({}, cliente); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
      this.indiceSelecionadoParaEdicao = indice;
  
      this.modalService.open(modal, { size: 'sm' });
    }
  
    addOuEditarCliente(cliente: Cliente) {
  
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

    deleteCliente(id: number) {
      if (confirm('Tem certeza de que deseja excluir este item?')) {
        this.clienteService.deleta(id).subscribe(
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
