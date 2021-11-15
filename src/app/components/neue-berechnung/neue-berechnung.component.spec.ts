import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/services/api.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeueBerechnungComponent } from './neue-berechnung.component';

describe('NeueBerechnungComponent', () => {
  let component: NeueBerechnungComponent;
  let fixture: ComponentFixture<NeueBerechnungComponent>;
  let mockApiService: ApiService;
  let persons = { 'Darth Vader': 'lel' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NeueBerechnungComponent],
      imports: [HttpClientModule],
      providers: [{ provide: ApiService, useValue: mockApiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeueBerechnungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //mockApiService = TestBed.inject(ApiService);
  //spyOn(mockApiService, 'apiCall').and.returnValue('0');

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test', () => {
    //component.volume = 0;
    //expect(component.test).toEqual('lel');
    const volumeEL = fixture.nativeElement.querySelector('.value');
    expect(component.volume).toEqual(0);

    expect(volumeEL.textContent).toBe('0 km³');
  });
});
