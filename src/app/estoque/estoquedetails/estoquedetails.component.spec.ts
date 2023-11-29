import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { EstoquedetailsComponent } from './estoquedetails.component';
import { EstoqueService } from 'src/Services/estoque.service';
import { Estoque } from 'src/models/estoque';

describe('EstoquedetailsComponent', () => {
  let component: EstoquedetailsComponent;
  let fixture: ComponentFixture<EstoquedetailsComponent>;
  let estoqueProdService: EstoqueService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoquedetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 1 }) } } },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
      ],
    });

    fixture = TestBed.createComponent(EstoquedetailsComponent);
    component = fixture.componentInstance;
    estoqueProdService = TestBed.inject(EstoqueService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should call salvar() method when button is clicked', fakeAsync(() => {
    spyOn(component, 'salvar');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    tick();
    expect(component.salvar).toHaveBeenCalled();
  }));

  it('should call service method for editing when id is greater than 0', fakeAsync(() => {
    component.estoque.id = 1;
    spyOn(estoqueProdService, 'edita').and.returnValue(of(new Estoque()));
    component.salvar();
    tick();
    expect(estoqueProdService.edita).toHaveBeenCalled();
  }));

  it('should call service method for creating when id is 0', fakeAsync(() => {
    spyOn(estoqueProdService, 'cadastra').and.returnValue(of(new Estoque()));
    component.salvar();
    tick();
    expect(estoqueProdService.cadastra).toHaveBeenCalled();
  }));

  // Add more tests to cover different scenarios

});
