import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Funcionario } from '../models/funcionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  API: string = 'http://3.144.130.43:8010/funcionario';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.API + '/lista');
  }

  cadastra(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.API, funcionario);
  }

  exemploErro(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.API + '/erro');
  }

  deleta(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }

  edita(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.put<Funcionario>(this.API, funcionario);
  }

}
