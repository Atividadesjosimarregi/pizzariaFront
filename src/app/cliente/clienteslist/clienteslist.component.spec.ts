import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/Services/cliente.service';
import { of } from 'rxjs';
import { ClienteslistComponent } from './clienteslist.component';
import { Cliente } from 'src/models/cliente';

describe('ClienteslistComponent', () => {
  let component: ClienteslistComponent;
  let fixture: ComponentFixture<ClienteslistComponent>;
  let modalService: NgbModal;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteslistComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        NgbModal,
        ClienteService,
      ],
    });
    fixture = TestBed.createComponent(ClienteslistComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    clienteService = TestBed.inject(ClienteService);
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

  it('should add a client to the list when addNaLista is called', () => {
    const cliente: Cliente = { id: 1, nome: 'Teste', enderecos: [] };
    component.addNaLista(cliente);
    expect(component.lista.length).toBe(1);
  });

  it('should retrieve the list of clients when list is called', () => {
    const lista: Cliente[] = [{ id: 1, nome: 'Teste', enderecos: [] }];
    spyOn(clienteService, 'list').and.returnValue(of(lista));
    component.list();
    expect(component.lista).toEqual(lista);
  });

  it('should delete a client when deleteCliente is called', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(clienteService, 'deleta').and.returnValue(of(null));
    component.deleteCliente(1);
    expect(clienteService.deleta).toHaveBeenCalledWith(1);
  });

  // Adicione mais testes para cobrir outros cenários e métodos

});
