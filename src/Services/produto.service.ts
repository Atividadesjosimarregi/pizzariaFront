import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'src/models/produto';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  API: string = 'http://localhost:8010/produto';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API + '/lista');
  }

  cadastra(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  exemploErro(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API + '/erro');
  }

  deleta(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }

  edita(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(this.API, produto);
  }

}
