import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BisherigeBerechnungenComponent } from './bisherige-berechnungen.component';

describe('BisherigeBerechnungenComponent', () => {
  let component: BisherigeBerechnungenComponent;
  let fixture: ComponentFixture<BisherigeBerechnungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BisherigeBerechnungenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BisherigeBerechnungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
