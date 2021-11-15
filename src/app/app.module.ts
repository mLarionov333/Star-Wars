import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NeueBerechnungComponent } from './components/neue-berechnung/neue-berechnung.component';
import { ApiService } from 'src/services/api.service';
import { BisherigeBerechnungenComponent } from './components/bisherige-berechnungen/bisherige-berechnungen.component';

@NgModule({
  declarations: [AppComponent, NeueBerechnungComponent, BisherigeBerechnungenComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
