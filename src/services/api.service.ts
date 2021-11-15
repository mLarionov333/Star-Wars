import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) {}

  public apiCallPre(target: string): any {
    return this.http.get(this.apiURL + target);
  }

  public apiCall(url: string): any {
    return this.http.get(url);
  }
}
