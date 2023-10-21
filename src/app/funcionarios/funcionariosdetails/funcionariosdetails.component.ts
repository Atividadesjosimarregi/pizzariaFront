import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from '../funcionario';
import { FuncionarioService } from 'src/app/Services/funcionario.service';

@Component({
  selector: 'app-funcionariosdetails',
  templateUrl: './funcionariosdetails.component.html',
  styleUrls: ['./funcionariosdetails.component.scss']
})
export class FuncionariosdetailsComponent {

  roteador = inject(ActivatedRoute);


  @Input() funcionario: Funcionario = new Funcionario();
  @Output() retorno = new EventEmitter<Funcionario>();

  funcionarioService = inject(FuncionarioService)

  constructor() {

  }

  salvar() {
    //ISSO AQUI SERVE PARA EDITAR OU ADICIONAR... TANTO FAZ

    this.funcionarioService.cadastra(this.funcionario).subscribe({
      next: funcionario => { // QUANDO DÁ CERTO
        this.retorno.emit(funcionario);
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });


  }

}
