import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { EstoquelistComponent } from './estoquelist.component';
import { EstoqueService } from 'src/Services/estoque.service';
import { Estoque } from 'src/models/estoque';

describe('EstoquelistComponent', () => {
  let component: EstoquelistComponent;
  let fixture: ComponentFixture<EstoquelistComponent>;
  let estoqueService: EstoqueService;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoquelistComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgbModal, useValue: { open: () => ({}), dismissAll: () => {} } },
        // Pode adicionar outros provedores necessários aqui
      ],
    });
    fixture = TestBed.createComponent(EstoquelistComponent);
    component = fixture.componentInstance;
    estoqueService = TestBed.inject(EstoqueService);
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when abrirModal is called', () => {
    spyOn(modalService, 'open');
    component.abrirModal({});
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should add item to lista when addNaLista is called', () => {
    const estoque: Estoque = { id: 1, nome: 'Item1', preco: 10, quantidade: 5 };
    spyOn(modalService, 'dismissAll');
    component.addNaLista(estoque);
    expect(component.lista).toContain(estoque);
    expect(modalService.dismissAll).toHaveBeenCalled();
  });

  it('should emit evento when lancamento is called', () => {
    const estoque: Estoque = { id: 1, nome: 'Item1', preco: 10, quantidade: 5 };
    spyOn(component.retorno, 'emit');
    component.lancamento(estoque);
    expect(component.retorno.emit).toHaveBeenCalledWith(estoque);
  });

  it('should call estoqueService.list when list is called', fakeAsync(() => {
    const mockLista: Estoque[] = [{ id: 1, nome: 'Item1', preco: 10, quantidade: 5 }];
    spyOn(estoqueService, 'list').and.returnValue(of(mockLista));
    component.list();
    tick();
    expect(component.lista).toEqual(mockLista);
  }));

  it('should call modalService.open when adicionar is called', () => {
    spyOn(modalService, 'open');
    component.adicionar({});
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should call modalService.open and set estoqueSelecionadoParaEdicao when editar is called', () => {
    const estoque: Estoque = { id: 1, nome: 'Item1', preco: 10, quantidade: 5 };
    spyOn(modalService, 'open');
    component.editar({}, estoque, 0);
    expect(modalService.open).toHaveBeenCalled();
    expect(component.estoqueSelecionadoParaEdicao).toEqual(estoque);
  });

  it('should call estoqueService.deleta and update lista when deleteEstoque is called', fakeAsync(() => {
    const idToDelete = 1;
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(estoqueService, 'deleta').and.returnValue(of(null));
    component.list(); // Load initial data
    const initialLength = component.lista.length;
    component.deleteEstoque(idToDelete);
    tick();
    expect(estoqueService.deleta).toHaveBeenCalledWith(idToDelete);
    expect(component.lista.length).toEqual(initialLength);
  }));

  // Add more tests to cover different scenarios

});
