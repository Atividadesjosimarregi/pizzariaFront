import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PizzaService } from 'src/Services/pizza.service';
import { Pizza } from 'src/models/pizza';
import { Sabor } from 'src/models/sabor';

@Component({
  selector: 'app-pizzasdetails',
  templateUrl: './pizzasdetails.component.html',
  styleUrls: ['./pizzasdetails.component.scss']
})
export class PizzasdetailsComponent {

  @Input() modoLancamento: boolean = false;
  @Input() pizza: Pizza = new Pizza();
  @Output() retorno = new EventEmitter<Pizza>();

  sabores: Sabor[] = []; 
  

  pizzaService = inject(PizzaService);

  constructor(){

    this.pizzaService.getAvailableSabores().subscribe( sabores => {
      this.sabores = sabores;
    })
  }

  salvar() {
    if (this.pizza.id > 0) {
      this.pizzaService.edita(this.pizza).subscribe({
        next: pizza => {
          this.retorno.emit(this.pizza);
          this.pizza.id = 0;
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else {
      this.pizzaService.cadastra(this.pizza).subscribe({
        next: pizza => {
          this.retorno.emit(pizza);
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
    this.pizzaService.deleta(this.pizza.id).subscribe({
      next: pizza =>{
          this.retorno.emit(pizza);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    })
  }

}
