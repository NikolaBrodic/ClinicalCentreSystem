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
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    UserChangePasswordComponent,
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
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    DemoMaterialModule,
    MatNativeDateModule,
  ],
  entryComponents: [ListaOfExaminationTypesComponent, AddExaminationTypeComponent, ListOfDoctorsComponent, AddDoctorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
