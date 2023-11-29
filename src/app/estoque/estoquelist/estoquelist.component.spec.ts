import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoquelistComponent } from './estoquelist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EstoquelistComponent', () => {
  let component: EstoquelistComponent;
  let fixture: ComponentFixture<EstoquelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoquelistComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(EstoquelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
