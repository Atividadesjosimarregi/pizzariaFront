import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { LoginComponent } from './sistema/login/login.component';
import { FuncionarioslistComponent } from './funcionarios/funcionarioslist/funcionarioslist.component';
import { SaboreslistComponent } from './sabor/saboreslist/saboreslist.component';
import { EstoquelistComponent } from './estoque/estoquelist/estoquelist.component';

const routes: Routes = [

{
  path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "admin", component: IndexComponent, children:[

    {path: "funcionarios", component: FuncionarioslistComponent},
    {path: "sabores", component: SaboreslistComponent},
    {path: "estoque", component: EstoquelistComponent}

  


  ]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
