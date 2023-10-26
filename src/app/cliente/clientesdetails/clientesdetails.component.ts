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

editar(){
  const novoEndereco = new Endereco();

  novoEndereco.rua = this.novoEndereco.rua;
  novoEndereco.bairro = this.novoEndereco.bairro;
  novoEndereco.numero = this.novoEndereco.numero;
  novoEndereco.observacao = this.novoEndereco.observacao;
  novoEndereco.cep = this.novoEndereco.cep;

  if (!this.cliente.enderecos) {
    this.cliente.enderecos = [];
  }


  this.clienteService.edita(this.cliente).subscribe({
    next: cliente => {
      this.retorno.emit(this.cliente);
      this.cliente.id = 0;
      this.cliente.enderecos = [];
      this.limparCamposEndereco();
      this.limparCamposCLiente();
    },
    error: erro => {
      alert('Error!! verificar no console!!');
      console.error(erro);
    }
  });
}


salvar() {

  const novoEndereco = new Endereco();

  novoEndereco.rua = this.novoEndereco.rua;
  novoEndereco.bairro = this.novoEndereco.bairro;
  novoEndereco.numero = this.novoEndereco.numero;
  novoEndereco.observacao = this.novoEndereco.observacao;
  novoEndereco.cep = this.novoEndereco.cep;

 
  if (!this.cliente.enderecos) {
    this.cliente.enderecos = [];
  }


  this.cliente.enderecos.push(novoEndereco);

  if (this.cliente.id > 0) {
    this.clienteService.edita(this.cliente).subscribe({
      next: cliente => {
        this.retorno.emit(this.cliente);
        this.cliente.id = 0;
        this.limparCamposEndereco();
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
        this.cliente.enderecos = [];
        this.limparCamposEndereco();
      },
      error: erro => {
        alert('Erro!! verificar no console!!');
        console.error(erro);
      }
    });
  }
}

limparCamposEndereco() {
  this.novoEndereco.rua = '';
  this.novoEndereco.bairro = '';
  this.novoEndereco.numero = 0;
  this.novoEndereco.observacao = '';
  this.novoEndereco.cep = '';
}

limparCamposCLiente(){
  this.cliente.nome = '';
}




}
