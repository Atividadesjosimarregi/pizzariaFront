import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estoque } from 'src/models/estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  API: string = 'http://localhost:8010/estoque';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.API + '/lista');
  }

  cadastra(estoque: Estoque): Observable<Estoque> {
    return this.http.post<Estoque>(this.API, estoque);
  }

  exemploErro(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.API + '/erro');
  }

  deleta(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }

  edita(estoque: Estoque): Observable<Estoque>{
    return this.http.put<Estoque>(this.API, estoque);
  }

}
