import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'src/models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  API: string = 'http://localhost:8010/pedido';
  http = inject(HttpClient);

  constructor() { }

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
