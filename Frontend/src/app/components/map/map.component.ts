import { UserService } from './../../services/user.service';
import { isUndefined } from 'util';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ClinicService } from 'src/app/services/clinic.service';
import { Clinic } from 'src/app/models/clinic';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Subscription } from 'rxjs';

var map;
var mark: L.Marker;
var deletedFirst = true;
var selectedClinic: Clinic;
var service: ClinicService;
declare var require: any
var convert = require('cyrillic-to-latin')
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {

  provider = new OpenStreetMapProvider();
  searchControl = new GeoSearchControl({
    provider: this.provider,
  });
  query_promise: any;
  editClinic: Subscription;
  addClinic: Subscription;

  constructor(private clinicService: ClinicService, private userService: UserService) {
    service = clinicService;
  }

  ngOnInit() {
    if (this.userService.isClinicAdmin()) {
      this.clinicService.getClinicInWhichClinicAdminWorks().subscribe((data: Clinic) => {
        selectedClinic = data;
        this.clinicService.get(selectedClinic.address).subscribe((data) => {
          if (!isUndefined(data) && data && !isUndefined(data[0])) {
            map.setView(new L.LatLng(Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon)), 20);
            const latlng = new L.LatLng(Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon));
            mark = new L.Marker(latlng, { draggable: false });
            map.addLayer(mark);
            deletedFirst = false;
          }

        });
      });
    } else {
      selectedClinic = new Clinic('', '', '');
    }

    this.editClinic = this.clinicService.editClinicEmitter.subscribe(
      (clinic: Clinic) => {
        this.markAddress(clinic.address);
      }
    );

    this.addClinic = this.clinicService.addClinicAdressEmiter.subscribe(
      (clinic: Clinic) => {
        this.markAddress(clinic.address);
      }
    );
  }

  markAddress(address: string) {
    this.clinicService.get(address).subscribe((data) => {
      var i = 0;
      map.eachLayer(function (layer) {
        if (i == 2) {
          map.removeLayer(layer);
        }
        i++;
      });
      deletedFirst = false;
      map.setView(new L.LatLng(Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon)), 20);
      const latlng = new L.LatLng(Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon));
      mark = new L.Marker(latlng, { draggable: false });
      map.addLayer(mark);
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
      attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
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

      if (!deletedFirst) {
        var i = 0;
        map.eachLayer(function (layer: any) {
          if (i == 2) {
            map.removeLayer(layer);
          }
          i++;
        });
        deletedFirst = true;
      }
      selectedClinic.address = convert(e.location.label);
      service.searchAddressClinicEmitter.next(selectedClinic);
      service.addSearchAddressClinicEmitter.next(selectedClinic);
    });
  }
}
