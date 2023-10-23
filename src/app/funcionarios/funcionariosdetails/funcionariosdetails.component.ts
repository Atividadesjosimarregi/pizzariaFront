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
    if (this.funcionario.id > 0) {
      this.funcionarioService.edita(this.funcionario).subscribe({
        next: funcionario => {
          this.retorno.emit(this.funcionario);
          this.funcionario.id = 0;
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else {
      this.funcionarioService.cadastra(this.funcionario).subscribe({
        next: funcionario => {
          this.retorno.emit(funcionario);
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });


    }

  }
}
