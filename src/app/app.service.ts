import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: Http) { }

  getList() {
    return this.http.get('https://feeds.citibikenyc.com/stations/stations.json').pipe(map((response: any) => response.json()));
  }
}
