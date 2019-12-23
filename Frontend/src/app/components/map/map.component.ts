import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  //map;


  constructor() {


    //this.initMap();
  }

  ngAfterViewInit(): void {
    /*
        this.map = L.map('map', {
          center: [39.8282, -98.5795],
          zoom: 3
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);*/
  }
  /*
    initMap(): void {
      this.map = L.map('map', {
        center: [39.8282, -98.5795],
        zoom: 3
      });
    }*/
}
