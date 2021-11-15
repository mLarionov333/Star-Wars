import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Berechnung } from 'src/dataformat/interfaces/berechnung';

@Component({
  selector: 'bisherige-berechnungen',
  templateUrl: './bisherige-berechnungen.component.html',
  styleUrls: ['./bisherige-berechnungen.component.scss'],
})
export class BisherigeBerechnungenComponent implements OnInit {
  @Output() neueBerechnung = new EventEmitter();

  @Input()
  berechnungen: Array<Berechnung> = [];

  constructor() {}

  ngOnInit(): void {}
}
