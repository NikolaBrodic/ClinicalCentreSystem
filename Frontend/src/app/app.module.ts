
import { RouterModule, Routes } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ListaOfExaminationTypesComponent } from './components/list-of-examination-types/list-of-examination-types.component';
import { DemoMaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPatientComponent } from './components/login-patient/login-patient.component';
import { PendingApprovalPatientComponent } from './components/pending-approval-patient/pending-approval-patient.component';
import { ErrorComponent } from './components/error/error.component';
import { AddExaminationTypeComponent } from './components/add-examination-type/add-examination-type.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';

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
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [

  ],
  entryComponents: [ListaOfExaminationTypesComponent, AddExaminationTypeComponent, ListOfDoctorsComponent, AddDoctorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
