import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/Services/cliente.service';
import { FuncionarioService } from 'src/Services/funcionario.service';
import { PedidoService } from 'src/Services/pedido.service';
import { PizzaService } from 'src/Services/pizza.service';
import { ProdutoService } from 'src/Services/produto.service';
import { SaborService } from 'src/Services/sabor.service';
import { Cliente } from 'src/models/cliente';
import { Estoque } from 'src/models/estoque';
import { Funcionario } from 'src/models/funcionario';
import { Pedido } from 'src/models/pedido';
import { Pizza } from 'src/models/pizza';
import { Produto } from 'src/models/produto';
import { Sabor } from 'src/models/sabor';

@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss']
})
export class PedidosdetailsComponent {

  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  pedidosService = inject(PedidoService);
  usuarioService = inject(ClienteService);
  funcionarioService = inject(FuncionarioService);
  saboresService = inject(SaborService);


  listaDeUsuarios: Cliente[] = [];
  listaDeFuncionarios: Funcionario[] = [];

  sabores: Sabor[] = [];
  listaDePizzas: Pizza = new Pizza();

  constructor() {
  }

  salvar() {
    const usuarioSelecionado = this.listaDeUsuarios.find(usuario => usuario.id === this.pedido.cliente.id);

    if (usuarioSelecionado) {
      this.pedido.cliente = usuarioSelecionado;
    }
    this.pedidosService.cadastra(this.pedido).subscribe({
      next: pedido => {
        this.retorno.emit(pedido);
      },
      error: erro => {
        alert('ERRO CABULOSO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }

  ngOnInit() {
    this.usuarioService.list().subscribe((usuarios: Cliente[]) => {
      this.listaDeUsuarios = usuarios;
    });

    this.funcionarioService.list().subscribe((funcionarios: Funcionario[]) => {
      this.listaDeFuncionarios = funcionarios;
    });

    this.saboresService.list().subscribe((sabores: Sabor[]) => {
      this.sabores = sabores;
    });
  }

  excluir(estoque: Estoque, indice: number) {
    this.pedido.estoque.splice(indice, 1);
  }

  excluirPizza(pizza: Pizza, indice: number) {
    this.pedido.pizzas.splice(indice, 1);
  }

  retornoProdutosList(estoque: Estoque) {

    if (this.pedido.estoque == null)
      this.pedido.estoque = [];

    this.pedido.estoque.push(estoque);
    this.modalRef.dismiss();
  }

  retornoPizzaList(pizza: Pizza) {

    if (this.pedido.pizzas == null)
      this.pedido.pizzas = [];

    this.pedido.pizzas.push(pizza);
    this.modalRef.dismiss();
  }


  lancar(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  lancarPizza(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  definirPagamentoDinheiro(valor: boolean) {
    this.pedido.pagamentoDinheiro = valor;
  }

}
