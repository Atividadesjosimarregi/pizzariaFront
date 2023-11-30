import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'src/models/produto';
import { Estoque } from 'src/models/estoque';
import { EstoqueService } from './estoque.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  API: string = 'http://3.144.130.43:8010/produto';
  http = inject(HttpClient);

  


  constructor(private estoqueService: EstoqueService) { }

  getAvailableEstoques(): Observable<Estoque[]> {
    return this.estoqueService.list();
  }

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
