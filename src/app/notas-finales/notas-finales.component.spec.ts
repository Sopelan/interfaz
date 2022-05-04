import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasFinalesComponent } from './notas-finales.component';

describe('NotasFinalesComponent', () => {
  let component: NotasFinalesComponent;
  let fixture: ComponentFixture<NotasFinalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasFinalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasFinalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
