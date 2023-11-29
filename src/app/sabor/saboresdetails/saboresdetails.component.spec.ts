import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SaboresdetailsComponent } from './saboresdetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Sabor } from 'src/models/sabor';
import { SaborService } from 'src/Services/sabor.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';

describe('SaboresdetailsComponent', () => {
  let component: SaboresdetailsComponent;
  let fixture: ComponentFixture<SaboresdetailsComponent>;

  let saboresService: SaborService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaboresdetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ], 
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 1 }) } } },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        // outros provedores necessários
      ],
    });
    fixture = TestBed.createComponent(SaboresdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saboresService = TestBed.inject(SaborService)
  });

  beforeEach(() => {
    let sabores = new Sabor();
    sabores.id = 1;
    sabores.saborr = 'calabresa';
    component.sabor = sabores;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TESTE DE 1 @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="sabor"]'));
    expect(elemento.nativeElement.ngModel).toEqual('calabresa');
  });

  it('TESTE 2 DE @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="sabor"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  beforeEach(() => {
    saboresService = TestBed.inject(SaborService);
  });

 /* it('DEVE CHAMAR O MÉTODO SAVE AO ENVIAR PASSANDO OBJETO', fakeAsync(() => {
    let spy = spyOn(saboresService, 'cadastra').and.callThrough();
  
    let sabores = new Sabor();
    sabores.saborr = 'eita';
    component.sabor = sabores;
    fixture.detectChanges();
  
    let button = fixture.debugElement.nativeElement.querySelector('button[name="botao"]');
    console.log(button);
  
    // Adicione esta linha para prevenir a ação padrão do botão
    spyOnProperty(button, 'form', 'get').and.returnValue({ checkValidity: () => true });
    
    // Adicione esta linha para prevenir a ação padrão do botão
    spyOnProperty(button, 'validity', 'get').and.returnValue({ valid: true });
  
    button.click();
  
    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(sabores);
  }));
  
  it('DEVE CHAMAR O MÉTODO SAVE AO ENVIAR', fakeAsync(() => {
    let spy = spyOn(saboresService, 'cadastra').and.callThrough();

    let sabores = new Sabor();
    sabores.saborr = 'eita';
    component.sabor = sabores;
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('button[name="botao"]');
    button.click();
    tick();
    expect(spy).toHaveBeenCalled();

  }));*/

  it('deve chamar o metood update quando sabores.id > 0 no salvar()', fakeAsync(() => {
    spyOn(saboresService, 'edita').and.returnValue(of(new Sabor())); // Mock the update method

    const sabores = new Sabor();
    sabores.id = 1;
    component.sabor = sabores;

    component.salvar();
    tick();

    expect(saboresService.edita).toHaveBeenCalledWith(sabores);
  }));

  it('deve chamar o metodo save quando sabores.id <= 0 no salvar()', fakeAsync(() => {
    spyOn(saboresService, 'cadastra').and.returnValue(of(new Sabor())); // Mock the save method

    const sabores = new Sabor();
    sabores.id = 0;
    component.sabor = sabores;

    component.salvar();
    tick();

    expect(saboresService.cadastra).toHaveBeenCalledWith(sabores);
  }));

  it('deve chamar o metodo deletar()', fakeAsync(() => {
    spyOn(saboresService, 'deleta').and.returnValue(of(new Sabor())); // Mock the delete method

    const sabores = new Sabor();
    sabores.id = 1;
    component.sabor = sabores;

    component.deletar();
    tick();

    expect(saboresService.deleta).toHaveBeenCalledWith(sabores.id);
  }));

});
