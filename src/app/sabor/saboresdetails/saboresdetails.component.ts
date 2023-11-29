import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaborService } from 'src/Services/sabor.service';

import { Sabor } from 'src/models/sabor';

@Component({
  selector: 'app-saboresdetails',
  templateUrl: './saboresdetails.component.html',
  styleUrls: ['./saboresdetails.component.scss']
})
export class SaboresdetailsComponent {

  roteador = inject(ActivatedRoute);


  @Input() sabor: Sabor = new Sabor();
  @Output() retorno = new EventEmitter<Sabor>();

  saborService = inject(SaborService)


  salvar() {
    if (this.sabor.id > 0) {
      this.saborService.edita(this.sabor).subscribe({
        next: sabor => {
          this.retorno.emit(this.sabor);
          this.sabor.id = 0;
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else {
      this.saborService.cadastra(this.sabor).subscribe({
        next: sabor => {
          this.retorno.emit(sabor);
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });

    }

  }

  deletar(){
    this.saborService.deleta(this.sabor.id).subscribe({
      next: sabores => {
        this.retorno.emit(sabores);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });



  }}
