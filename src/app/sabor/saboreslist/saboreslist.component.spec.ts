import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaboreslistComponent } from './saboreslist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SaboreslistComponent', () => {
  let component: SaboreslistComponent;
  let fixture: ComponentFixture<SaboreslistComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
