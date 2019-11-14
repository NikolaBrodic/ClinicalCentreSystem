import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ListaOfExaminationTypesComponent } from './components/list-of-examination-types/list-of-examination-types.component';
import { DemoMaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddExaminationTypeComponent } from './components/add-examination-type/add-examination-type.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddDoctorComponent,
    ListOfDoctorsComponent,
    ListaOfExaminationTypesComponent,
    AddExaminationTypeComponent,
    LoginComponent,
    RegisterPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxMaterialTimepickerModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [ListaOfExaminationTypesComponent, AddExaminationTypeComponent, ListOfDoctorsComponent, AddDoctorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
