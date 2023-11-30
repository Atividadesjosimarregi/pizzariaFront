import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from 'src/models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  API: string = 'http://3.144.130.43:8010/endereco';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API + '/lista');
  }

  cadastra(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.API, endereco);
  }

  exemploErro(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API + '/erro');
  }

  deleta(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }

  edita(endereco: Endereco): Observable<Endereco>{
    return this.http.put<Endereco>(this.API, endereco);
  }

  editaEndereco(endereco: Endereco): Observable<Endereco> {
    const url = `${this.API}/${endereco.id}`;
    return this.http.put<Endereco>(url, endereco);
  }

}
