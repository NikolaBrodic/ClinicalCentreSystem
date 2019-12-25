import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ClinicService } from 'src/app/services/clinic.service';
import { Clinic } from 'src/app/models/clinic';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
var map;
var mark: L.Marker;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {


  selectedClinic: Clinic;
  provider = new OpenStreetMapProvider();
  searchControl = new GeoSearchControl({
    provider: this.provider,
  });
  query_promise: any;
  lat: number;
  lon: number;
  constructor(private clinicService: ClinicService) {

  }

  ngOnInit() {

    this.clinicService.getClinicInWhichClinicAdminWorks().subscribe((data: Clinic) => {
      this.selectedClinic = data;
      this.clinicService.get("Novi sad Tolstojeva").subscribe((data) => {
        map.setView(new L.LatLng(Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon)), 20);
        var latlng = new L.LatLng(Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon));
        mark = new L.Marker(latlng, { draggable: false });
        map.addLayer(mark);
      });
    });
  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 10
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    new GeoSearchControl({
      provider: this.provider,
      showMarker: true,
      showPopup: false,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      popupFormat: ({ query, result }) => result.label,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Enter address',
      keepResult: true
    }).addTo(map);

    map.on('geosearch/showlocation', function (e: any) {
      console.log(map)
      var i = 0;
      map.eachLayer(function (layer) {
        if (i === 2) {
          map.removeLayer(layer)
        }
        i++;
      });
    });

  }



}
