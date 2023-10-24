import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API: string = 'http://localhost:8010/login';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Login[]> {
    return this.http.get<Login[]>(this.API + '/lista');
  }

  cadastra(login: Login): Observable<Login> {
    return this.http.post<Login>(this.API, login);
  }

  exemploErro(): Observable<Login[]> {
    return this.http.get<Login[]>(this.API + '/erro');
  }

  deleta(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }

  edita(login: Login): Observable<Login>{
    return this.http.put<Login>(this.API, login);
  }

}
