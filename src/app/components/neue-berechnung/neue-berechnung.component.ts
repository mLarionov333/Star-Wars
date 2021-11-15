import { ApiService } from 'src/services/api.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ISearchResult } from 'src/dataformat/interfaces/search-result';
import { IPerson } from 'src/dataformat/interfaces/person';
import { IPlanet } from 'src/dataformat/interfaces/planet';
import { Berechnung } from 'src/dataformat/interfaces/berechnung';

@Component({
  selector: 'neue-berechnung',
  templateUrl: './neue-berechnung.component.html',
  styleUrls: ['./neue-berechnung.component.scss'],
})
export class NeueBerechnungComponent implements OnInit {
  @Output() neueBerechnung = new EventEmitter<Berechnung>();
  /**
   * Liste der Suchergebnisse
   *
   * @type {Array<string>}
   * @memberof NeueBerechnungComponent
   */
  public persons: Array<string> = [];

  /**
   * ausgewählte Personen
   *
   * @type {Array<string>}
   * @memberof NeueBerechnungComponent
   */
  public selectedPersons: Array<string> = [];

  /**
   * Anzahl der durchgeführten Suchvorgänge
   *
   * @private
   * @memberof NeueBerechnungComponent
   */
  private searchCount = 0;

  /**
   * Anzahl der durchgeführten Berechnungen
   *
   * @private
   * @memberof NeueBerechnungComponent
   */
  public volumeCount = 0;

  /**
   * das Ergebnis der letzten Volumenberechnung
   *
   * @memberof NeueBerechnungComponent
   */
  public volume = 0;

  /**
   * gibt an, ob gerade eine Berechnung durchgeführt wird
   *
   * @memberof NeueBerechnungComponent
   */
  public calculating = false;

  constructor(private apiService: ApiService) {}

  /**
   * Liste der Auto-Vervollständigungen aktualisieren
   *
   * @param {string} value
   * @return {*}  {void}
   * @memberof NeueBerechnungComponent
   */
  public updateSearch(value: string): void {
    this.searchCount++;
    const fetchId = this.searchCount;
    this.persons = [];

    if (value.length < 2) {
      return;
    }

    this.apiService
      .apiCallPre('people/?search=' + value)
      .subscribe((data: ISearchResult) => {
        // überprüfe ob ein neuer Aufruf der updateSearch Methode erfolgt ist
        if (fetchId !== this.searchCount) return;
        this.persons.push(...data.results.map((x) => x.name));
        // falls das Ergebnis mehrere Pages enthält
        if (data.next) {
          this.fetchPersons(data.next, fetchId);
        }
      });
  }

  /**
   * Person zu selectedPersons Array hinzufügen
   *
   * @param {string} name
   * @memberof NeueBerechnungComponent
   */
  public addPerson(name: string): void {
    if (!this.selectedPersons.includes(name)) {
      this.selectedPersons.push(name);
    }
  }

  /**
   *
   * Liste der Auto-Vervollständigungen vervollständigen (bei Ergebnissen mit mehreren Pages)
   * @private
   * @param {string} url
   * @param {number} fetchId
   * @memberof NeueBerechnungComponent
   */
  private fetchPersons(url: string, fetchId: number): void {
    this.apiService.apiCall(url).subscribe((data: ISearchResult) => {
      // überprüfe ob ein neuer Aufruf der updateSearch Methode erfolgt ist
      if (fetchId !== this.searchCount) return;
      this.persons.push(...data.results.map((x) => x.name));
      if (data.next) {
        this.fetchPersons(data.next, fetchId);
      }
    });
  }

  /**
   * Aktualisieren des Volumens der Planeten (this.volume)
   *
   * @memberof NeueBerechnungComponent
   */
  public updateVolume(persons: Array<string>): void {
    this.volumeCount++;
    const count = this.volumeCount;
    this.volume = 0;
    this.calculating = true;
    let planets: Array<string> = [];

    persons.forEach((person, i) => {
      this.apiService
        .apiCallPre('people/?search=' + person)
        .subscribe((data: ISearchResult) => {
          if (!planets.includes(data.results[0].homeworld)) {
            planets.push(data.results[0].homeworld);
          }
          if (i === this.selectedPersons.length - 1) {
            planets.forEach((planet, j) => {
              this.apiService.apiCall(planet).subscribe((data: IPlanet) => {
                if (count !== this.volumeCount) {
                  return;
                }
                if (data.diameter !== 'unknown') {
                  this.volume +=
                    ((Math.pow(Number(data.diameter) / 2, 3) * 4) / 3) *
                    Math.PI;
                }
              });
              if (j === planets.length - 1) {
                this.calculating = false;
              }
            });
          }
        });
    });
  }
  public berechnungConfirm(): void {
    let personen = '';

    this.selectedPersons.forEach((person) => {
      personen += person + '/';
    });
    personen = personen.substring(0, personen.length - 1);
    this.neueBerechnung.emit({
      personen,
      volume: this.volume,
    });
  }
  ngOnInit(): void {}
}
