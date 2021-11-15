import { Component } from '@angular/core';
import { Mode } from 'src/dataformat/enums/mode.enum';
import { Berechnung } from 'src/dataformat/interfaces/berechnung';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public mode: Mode = Mode.Bisherige;

  public berechnungen: Array<Berechnung> = [];

  constructor() {}

  public addBerechnung(berechnung: Berechnung) {
    this.mode = Mode.Bisherige;
    this.berechnungen.push(berechnung);
    console.log(berechnung);
  }

  public changeMode() {
    this.mode = Mode.Neue;
  }

  title = 'starwars';
}
