import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SaboreslistComponent } from './saboreslist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SaborService } from 'src/Services/sabor.service';
import { Sabor } from 'src/models/sabor';
import { of } from 'rxjs';

describe('SaboreslistComponent', () => {
  let component: SaboreslistComponent;
  let fixture: ComponentFixture<SaboreslistComponent>;
  let saboresService: SaborService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaboreslistComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(SaboreslistComponent);
    component = fixture.componentInstance;
    saboresService = TestBed.inject(SaborService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the list of sabores on listAll success', fakeAsync(() => {
    const mockSabores: Sabor[] = [{ id: 1, saborr: 'Teste 1' }, { id: 2, saborr: 'Teste 2' }];
    spyOn(saboresService, 'list').and.returnValue(of(mockSabores));
  
    component.list();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockSabores);
  }));
  

  it('should open modal on adicionar', fakeAsync(() => {
    spyOn(component.modalService, 'open').and.returnValue({ componentInstance: {}, result: Promise.resolve('result') } as any);

    component.adicionar({} as any);
    tick();
    fixture.detectChanges();

    expect(component.modalService.open).toHaveBeenCalled();
  }));

  it('should call delete method on excluir', fakeAsync(() => {
    spyOn(saboresService, 'deleta').and.returnValue(of(null));
    const mockSabores = { id: 1, saborPizza: 'Teste' };

    component.deleteSabor(mockSabores.id);
    tick();
    fixture.detectChanges();

    expect(saboresService.deleta).toHaveBeenCalledWith(mockSabores.id);
    expect(component.lista.length).toBe(0); // Assuming that the delete method will remove the item from the list
  }));
});
