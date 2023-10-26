import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'src/models/pedido';
import { Cliente } from 'src/models/cliente';
import { Funcionario } from 'src/models/funcionario';
import { ClienteService } from './cliente.service';
import { FuncionarioService } from './funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  API: string = 'http://localhost:8010/pedido';
  http = inject(HttpClient);

  constructor(private clienteService: ClienteService, private funcionarioService: FuncionarioService) { }


  getAvailableClientes(): Observable<Cliente[]> {
    return this.clienteService.list();
  }

  getAvailableFuncionarios(): Observable<Funcionario[]> {
    return this.funcionarioService.list();
  }

  list(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API + '/lista');
  }

  cadastra(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API, pedido);
  }

  exemploErro(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API + '/erro');
  }

  deleta(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }

  edita(pedido: Pedido): Observable<Pedido>{
    return this.http.put<Pedido>(this.API, pedido);
  }

}
