import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from 'src/models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  API: string = 'http://localhost:8010/pizza';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.API + '/lista');
  }

  cadastra(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.API, pizza);
  }

  exemploErro(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.API + '/erro');
  }

  deleta(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }

  edita(pizza: Pizza): Observable<Pizza>{
    return this.http.put<Pizza>(this.API, pizza);
  }

}
