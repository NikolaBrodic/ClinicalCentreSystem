import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClinicService } from './../../../services/clinic.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit, Inject } from '@angular/core';
import { Clinic } from 'src/app/models/clinic';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-edit-clinic-profile',
  templateUrl: './edit-clinic-profile.component.html',
  styleUrls: ['./edit-clinic-profile.component.css']
})
export class EditClinicProfileComponent implements OnInit {
  editClinicForm: FormGroup;
  selectedClinic: Clinic;

  provider = new OpenStreetMapProvider();

  map = new L.Map('map');

  searchControl = new GeoSearchControl({
    provider: this.provider,
    style: 'bar',
    autoComplete: true,
    autoCompleteDelay: 250,
    showMarker: true,                                   // optional: true|false  - default true
    showPopup: false,                                   // optional: true|false  - default false
    marker: {                                           // optional: L.Marker    - default L.Icon.Default
      icon: new L.Icon.Default(),
      draggable: false,
    },
    popupFormat: ({ query, result }) => result.label,   // optional: function    - default returns result label
    maxMarkers: 1,                                      // optional: number      - default 1
    retainZoomLevel: false,                             // optional: true|false  - default false
    animateZoom: true,                                  // optional: true|false  - default true
    autoClose: false,                                   // optional: true|false  - default false
    searchLabel: 'Enter address',                       // optional: string      - default 'Enter address'
    keepResult: false
  }).addTo(this.map);


  constructor(private toastr: ToastrService, private clinicService: ClinicService) {
    this.map.addControl(this.searchControl);
  }

  ngOnInit() {
    this.editClinicForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      address: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
    this.clinicService.getClinicInWhichClinicAdminWorks().subscribe((data: Clinic) => {
      this.selectedClinic = data;
      this.editClinicForm.patchValue(
        {
          'name': this.selectedClinic.name,
          'address': this.selectedClinic.address,
          'description': this.selectedClinic.description
        }
      );
    })

  }

  edit() {
    if (this.editClinicForm.invalid) {
      this.toastr.error("Please enter a valid data.", "Edit clinic's profile ");
      return;
    }
    if (!this.selectedClinic) {
      this.toastr.error("Please choose a clinic.", "Edit clinic's profile ");
      return;
    }
    const clinic = new Clinic(this.editClinicForm.value.name, this.editClinicForm.value.address,
      this.editClinicForm.value.description, this.selectedClinic.id);

    this.clinicService.edit(clinic).subscribe(
      (responseData: Clinic) => {
        this.toastr.success("Successfully changed clinic's profile.", "Edit clinic's profile ");
      },
      message => {
        this.toastr.error("You can not edit this profile because clinic with the same name or address already exists ",
          "Edit clinic's profile ");

      }
    );
  }
  ngAfterViewInit(): void {
  }
}
