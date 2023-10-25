import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/Services/cliente.service';
import { Cliente } from 'src/models/cliente';
import { Endereco } from 'src/models/endereco';


@Component({
  selector: 'app-clientesdetails',
  templateUrl: './clientesdetails.component.html',
  styleUrls: ['./clientesdetails.component.scss']
})
export class ClientesdetailsComponent {

  roteador = inject(ActivatedRoute);


  @Input() cliente: Cliente = new Cliente();
  @Output() retorno = new EventEmitter<Cliente>();

  clienteService = inject(ClienteService)
 

  constructor() {
  }
  
novoEndereco = new Endereco();
  salvar() {

    this.cliente.enderecos?.push(this.novoEndereco);
    if (this.cliente.id > 0) {
      this.clienteService.edita(this.cliente).subscribe({
        next: cliente => {
          this.retorno.emit(this.cliente);
          this.cliente.id = 0;
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else {
      this.clienteService.cadastra(this.cliente).subscribe({
        next: cliente => {
          this.retorno.emit(cliente);
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });


    }

  }

}
