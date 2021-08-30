/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Evento_editComponent } from './evento_edit.component';

describe('Evento_editComponent', () => {
  let component: Evento_editComponent;
  let fixture: ComponentFixture<Evento_editComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Evento_editComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Evento_editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
