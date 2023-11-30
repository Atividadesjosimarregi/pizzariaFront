  import { Injectable, inject } from '@angular/core';
  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Cliente } from 'src/models/cliente';
import { Endereco } from 'src/models/endereco';

  @Injectable({
    providedIn: 'root'
  })
  export class ClienteService {

    API: string = 'http://3.144.130.43:8010/cliente';
    http = inject(HttpClient);

    constructor() { }

    list(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.API + '/lista');
    }

    cadastra(cliente: Cliente): Observable<Cliente> {
      return this.http.post<Cliente>(this.API, cliente);
    }

    exemploErro(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.API + '/erro');
    }

    deleta(id: number): Observable<any> {
      const url = `${this.API}/${id}`;
      return this.http.delete(url);
    }

    edita(cliente: Cliente): Observable<Cliente>{
      return this.http.put<Cliente>(this.API, cliente);
    }

    editaEndereco(endereco: Endereco): Observable<Cliente> {
      const url = `${this.API}/endereco/${endereco.id}`;
      return this.http.put<Cliente>(url, endereco);
    }}
