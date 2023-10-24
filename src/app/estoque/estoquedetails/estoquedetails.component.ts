import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstoqueService } from 'src/Services/estoque.service';
import { Estoque } from 'src/models/estoque';

@Component({
  selector: 'app-estoquedetails',
  templateUrl: './estoquedetails.component.html',
  styleUrls: ['./estoquedetails.component.scss']
})
export class EstoquedetailsComponent {

  roteador = inject(ActivatedRoute);


  @Input() estoque: Estoque = new Estoque();
  @Output() retorno = new EventEmitter<Estoque>();

  estoqueService = inject(EstoqueService)

  constructor() {

  }

  salvar() {
    if (this.estoque.id > 0) {
      this.estoqueService.edita(this.estoque).subscribe({
        next: estoque => {
          this.retorno.emit(this.estoque);
          this.estoque.id = 0;
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else {
      this.estoqueService.cadastra(this.estoque).subscribe({
        next: estoque => {
          this.retorno.emit(estoque);
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });


    }

  }

}
