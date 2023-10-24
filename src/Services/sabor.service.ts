import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sabor } from 'src/models/sabor';

@Injectable({
  providedIn: 'root'
})
export class SaborService {

  API: string = 'http://localhost:8010/sabor';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Sabor[]> {
    return this.http.get<Sabor[]>(this.API + '/lista');
  }

  cadastra(sabor: Sabor): Observable<Sabor> {
    return this.http.post<Sabor>(this.API, sabor);
  }

  exemploErro(): Observable<Sabor[]> {
    return this.http.get<Sabor[]>(this.API + '/erro');
  }

  deleta(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }

  edita(sabor: Sabor): Observable<Sabor>{
    return this.http.put<Sabor>(this.API, sabor);
  }

}
