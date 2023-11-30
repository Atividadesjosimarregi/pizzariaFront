import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from 'src/models/pizza';
import { Sabor } from 'src/models/sabor';
import { SaborService } from './sabor.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  API: string = 'http://3.144.130.43:8010/pizza';
  http = inject(HttpClient);

  constructor(private saborService: SaborService) {}


  getAvailableSabores(): Observable<Sabor[]> {
    return this.saborService.list();
  }

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
