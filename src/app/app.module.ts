import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { IndexComponent } from './layout/index/index.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './sistema/login/login.component';
import { FuncionariosdetailsComponent } from './funcionarios/funcionariosdetails/funcionariosdetails.component';
import { FuncionarioslistComponent } from './funcionarios/funcionarioslist/funcionarioslist.component';
import { HttpClientModule } from '@angular/common/http';
import { SaboreslistComponent } from './sabor/saboreslist/saboreslist.component';
import { SaboresdetailsComponent } from './sabor/saboresdetails/saboresdetails.component';
import { ProdutoslistComponent } from './produto/produtoslist/produtoslist.component';
import { ProdutosdetailsComponent } from './produto/produtosdetails/produtosdetails.component';
import { EstoquelistComponent } from './estoque/estoquelist/estoquelist.component';
import { EstoquedetailsComponent } from './estoque/estoquedetails/estoquedetails.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    FuncionariosdetailsComponent,
    FuncionarioslistComponent,
    SaboreslistComponent,
    SaboresdetailsComponent,
    ProdutoslistComponent,
    ProdutosdetailsComponent,
    EstoquelistComponent,
    EstoquedetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
