import { ErrorComponent } from './components/error/error.component';
import { PendingApprovalPatientComponent } from './components/pending-approval-patient/pending-approval-patient.component';
import { LoginPatientComponent } from './components/login-patient/login-patient.component';
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
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPatientComponent,
    LoginPatientComponent,
    PendingApprovalPatientComponent,
    ErrorComponent,
    AddDoctorComponent,
    ListOfDoctorsComponent,
    ListaOfExaminationTypesComponent,
    AddExaminationTypeComponent,
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
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    DemoMaterialModule,
    MatNativeDateModule
  ],
  entryComponents: [ListaOfExaminationTypesComponent, AddExaminationTypeComponent, ListOfDoctorsComponent, AddDoctorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
