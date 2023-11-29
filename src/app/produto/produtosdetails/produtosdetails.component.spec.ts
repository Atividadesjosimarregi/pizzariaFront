import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProdutosdetailsComponent } from './produtosdetails.component';
import { ProdutoService } from 'src/Services/produto.service';
import { of } from 'rxjs';
import { Produto } from 'src/models/produto';
import { Estoque } from 'src/models/estoque';

describe('ProdutosdetailsComponent', () => {
  let component: ProdutosdetailsComponent;
  let fixture: ComponentFixture<ProdutosdetailsComponent>;
  let produtoService: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosdetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ProdutoService, useValue: { cadastra: () => of(null), edita: () => of(null), deleta: () => of(null) } },
        // Adicione outros provedores necessários aqui
      ],
    });
    fixture = TestBed.createComponent(ProdutosdetailsComponent);
    component = fixture.componentInstance;
    produtoService = TestBed.inject(ProdutoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cadastra method when salvar is called for a new produto', fakeAsync(() => {
    spyOn(produtoService, 'cadastra').and.returnValue(of(new Produto()));
    component.salvar();
    tick();
    expect(produtoService.cadastra).toHaveBeenCalled();
  }));

  it('should call edita method when salvar is called for an existing produto', fakeAsync(() => {
    component.produto.id = 1;
    spyOn(produtoService, 'edita').and.returnValue(of(new Produto()));
    component.salvar();
    tick();
    expect(produtoService.edita).toHaveBeenCalled();
  }));

  it('should emit retorno after salvar', fakeAsync(() => {
    spyOn(component.retorno, 'emit');
    spyOn(produtoService, 'cadastra').and.returnValue(of(new Produto()));
    component.salvar();
    tick();
    expect(component.retorno.emit).toHaveBeenCalled();
  }));

  it('should call deleta method when deletar is called', fakeAsync(() => {
    spyOn(produtoService, 'deleta').and.returnValue(of(null));
    component.deletar();
    tick();
    expect(produtoService.deleta).toHaveBeenCalled();
  }));

  it('should populate estoqueProdLista after ngOnInit', fakeAsync(() => {
    const mockEstoqueProdLista: Estoque[] = [{ id: 1, preco: 2,nome: 'Estoque1' ,quantidade:2}];
    spyOn(component.estoqueProdService, 'list').and.returnValue(of(mockEstoqueProdLista));
    component.ngOnInit();
    tick();
    expect(component.estoqueProdLista).toEqual(mockEstoqueProdLista);
  }));

  // Adicione mais testes para cobrir outros cenários

});
