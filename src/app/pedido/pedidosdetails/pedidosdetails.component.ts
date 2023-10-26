import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from 'src/Services/pedido.service';
import { PizzaService } from 'src/Services/pizza.service';
import { ProdutoService } from 'src/Services/produto.service';
import { Cliente } from 'src/models/cliente';
import { Funcionario } from 'src/models/funcionario';
import { Pedido } from 'src/models/pedido';
import { Pizza } from 'src/models/pizza';
import { Produto } from 'src/models/produto';

@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss']
})
export class PedidosdetailsComponent {

  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();

  modalService = inject(NgbModal);
  pizzaService = inject(PizzaService);
  produtoService = inject(ProdutoService);

  pizzaSelecionadoParaEdicao: Pizza = new Pizza();
  produtoSelecionadoParaEdicao: Produto = new Produto();

  listaProduto: Produto[] = [];

  listaPizza: Pizza[] = [];
  

  clientes: Cliente[] = [];
  funcionarios: Funcionario[] = [];


  pedidoService = inject(PedidoService);

  constructor() {

    this.pedidoService.getAvailableClientes().subscribe(clientes => {
      this.clientes = clientes;
    })


    this.pedidoService.getAvailableFuncionarios().subscribe(funcionarios => {
      this.funcionarios = funcionarios;
    })
  }

  salvar() {
    if (this.pedido.id > 0) {
      this.pedidoService.edita(this.pedido).subscribe({
        next: pedido => {
          this.retorno.emit(this.pedido);
          this.pedido.id = 0;
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else {
      this.pedidoService.cadastra(this.pedido).subscribe({
        next: pedido => {
          this.retorno.emit(pedido);
          console.log("deu bom");
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });

    }

  }


  abrirModal(abc : any){
    this.modalService.open(abc, {size: 'lg'});
  }

  addOuEditarPizza(pizza: Pizza) {
  
    this.listPizza();

   

    this.modalService.dismissAll();

  }

  addOuEditarProduto(produto: Produto) {
  
    this.listProduto();

   

    this.modalService.dismissAll();

  }

  listProduto() {

    this.produtoService.list().subscribe({
      next: listaProduto => { 
        this.listaProduto = listaProduto;
      },
      error: erro => { 
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  listPizza() {

    this.pizzaService.list().subscribe({
      next: listaPizza => { 
        this.listaPizza = listaPizza;
      },
      error: erro => { 
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  deletar() {
    this.pedidoService.deleta(this.pedido.id).subscribe({
      next: pedido => {
        this.retorno.emit(pedido);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    })
  }

}
