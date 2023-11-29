import { Component } from '@angular/core';
import { LoginService } from 'src/Services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  loginService = new LoginService();

  isAdmin = this.loginService.hasPermission('ADMIN');
  isUser = this.loginService.hasPermission('USER');
  isFuncionario = this.loginService.hasPermission('FUNCIONARIO');

}
