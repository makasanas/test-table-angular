import { Component } from '@angular/core';
import { stringify } from 'querystring';

import { NiceDateFormatPipe } from './niceDateFormatPipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'citybikenyc';

  public rows = [];
  public columns = [
    { prop: 'stationName', name: 'Station Name', sort: true },
    { prop: 'availableDocks', name: 'Available Docks' },
    { prop: 'totalDocks', name: 'Total Docks' },
    { prop: 'statusValue', name: 'Status Value' }
  ];

  public temp = [];
  public page: any = {
    offset: 0,
    limit: 10
  }


  constructor() {
    this.fetch(data => {
      console.log(data.stationBeanList);
      data.stationBeanList.forEach(element => {
        // console.log(NiceDateFormatPipe.prototype.transform(element.lastCommunicationTime));
        element.searchString = element.availableBikes.toString() + element.stationName + element.availableDocks.toString() + element.statusValue + element.totalDocks.toString() + NiceDateFormatPipe.prototype.transform(element.lastCommunicationTime);
        console.log(element.searchString);
      });
      // cache our list
      this.temp = [...data.stationBeanList];

      // push our inital complete list
      this.rows = data.stationBeanList;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/stations.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.searchString.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.page.offset = 0;
  }


}
