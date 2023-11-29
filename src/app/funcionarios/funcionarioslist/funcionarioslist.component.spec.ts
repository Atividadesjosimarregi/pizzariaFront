import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioslistComponent } from './funcionarioslist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FuncionarioslistComponent', () => {
  let component: FuncionarioslistComponent;
  let fixture: ComponentFixture<FuncionarioslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioslistComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(FuncionarioslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
