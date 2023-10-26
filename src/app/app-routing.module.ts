import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { LoginComponent } from './sistema/login/login.component';
import { FuncionarioslistComponent } from './funcionarios/funcionarioslist/funcionarioslist.component';
import { SaboreslistComponent } from './sabor/saboreslist/saboreslist.component';
import { EstoquelistComponent } from './estoque/estoquelist/estoquelist.component';
import { ClientesdetailsComponent } from './cliente/clientesdetails/clientesdetails.component';
import { ClienteslistComponent } from './cliente/clienteslist/clienteslist.component';
import { PizzasdetailsComponent } from './pizza/pizzasdetails/pizzasdetails.component';
import { ProdutosdetailsComponent } from './produto/produtosdetails/produtosdetails.component';
import { PedidosdetailsComponent } from './pedido/pedidosdetails/pedidosdetails.component';
import { PedidoslistComponent } from './pedido/pedidoslist/pedidoslist.component';

const routes: Routes = [

{
  path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "admin", component: IndexComponent, children:[

    {path: "funcionarios", component: FuncionarioslistComponent},
    {path: "sabores", component: SaboreslistComponent},
    {path: "estoque", component: EstoquelistComponent},
    {path: "cliente", component: ClienteslistComponent},
    {path: "pizza", component: PizzasdetailsComponent},
    {path: "produto", component: ProdutosdetailsComponent},
    {path: "pedido", component: PedidoslistComponent }

  


  ]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
