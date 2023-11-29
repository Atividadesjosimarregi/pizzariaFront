import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientesdetailsComponent } from './clientesdetails.component';
import { ClienteService } from 'src/Services/cliente.service';
import { of } from 'rxjs';
import { Cliente } from 'src/models/cliente';
import { Endereco } from 'src/models/endereco';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

describe('ClientesdetailsComponent', () => {
  let component: ClientesdetailsComponent;
  let fixture: ComponentFixture<ClientesdetailsComponent>;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesdetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 1 }) } } },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        ClienteService, // remova o useValue e use a instância real do serviço
      ],
    });
    fixture = TestBed.createComponent(ClientesdetailsComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cadastra method when salvar is called for a new cliente', fakeAsync(() => {
    spyOn(clienteService, 'cadastra').and.returnValue(of(new Cliente()));
    component.salvar();
    tick();
    expect(clienteService.cadastra).toHaveBeenCalled();
  }));

  it('should call edita method when salvar is called for an existing cliente', fakeAsync(() => {
    component.cliente.id = 1;
    spyOn(clienteService, 'edita').and.returnValue(of(new Cliente()));
    component.salvar();
    tick();
    expect(clienteService.edita).toHaveBeenCalled();
  }));

  it('should emit retorno after salvar', fakeAsync(() => {
    spyOn(component.retorno, 'emit');
    spyOn(clienteService, 'cadastra').and.returnValue(of(new Cliente()));
    component.salvar();
    tick();
    expect(component.retorno.emit).toHaveBeenCalled();
  }));

  // Adicione mais testes para cobrir outros cenários

});
