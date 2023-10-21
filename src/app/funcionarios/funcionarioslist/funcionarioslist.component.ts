import { Component, inject } from '@angular/core';
import { Funcionario } from '../funcionario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioService } from 'src/app/Services/funcionario.service';

@Component({
  selector: 'app-funcionarioslist',
  templateUrl: './funcionarioslist.component.html',
  styleUrls: ['./funcionarioslist.component.scss']
})
export class FuncionarioslistComponent {

  lista: Funcionario[] = [];

  funcionarioSelecionadoParaEdicao: Funcionario = new Funcionario();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  funcionarioService = inject(FuncionarioService);

  constructor(){

    this.list();


  }



    abrirModal(abc : any){
      this.modalService.open(abc, {size: 'lg'});
    }

    addNaLista(funcionario: Funcionario){

      this.lista.push(funcionario);
      this.modalService.dismissAll();

    }

    list() {

      this.funcionarioService.list().subscribe({
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
  
      this.funcionarioService.exemploErro().subscribe({
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
      this.funcionarioSelecionadoParaEdicao = new Funcionario();
  
      this.modalService.open(modal, { size: 'sm' });
    }
  
    editar(modal: any, funcionario: Funcionario, indice: number) {
      this.funcionarioSelecionadoParaEdicao = Object.assign({}, funcionario); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
      this.indiceSelecionadoParaEdicao = indice;
  
      this.modalService.open(modal, { size: 'sm' });
    }
  
    addOuEditarPessoa(funcionario: Funcionario) {
  
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

    deleteFuncionario(id: number) {
      if (confirm('Tem certeza de que deseja excluir esta pessoa?')) {
        this.funcionarioService.deleta(id).subscribe(
          () => {
            
            this.list();
          },
          (error) => {
            console.error('Erro ao excluir a pessoa.', error);
            
          }
        );
      }
    }
    

}
