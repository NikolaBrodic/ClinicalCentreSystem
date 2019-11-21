import { ListOfExaminationTypesComponent } from './components/list-of-examination-types/list-of-examination-types.component';
import { TokenInterceptor } from './interseptors/TokenInterceptor';
import { ErrorComponent } from './components/error/error.component';
import { PendingApprovalPatientComponent } from './components/pending-approval-patient/pending-approval-patient.component';
import { LoginPatientComponent } from './components/login-patient/login-patient.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { DemoMaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddExaminationTypeComponent } from './components/add-examination-type/add-examination-type.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { ListRequestsToRegisterComponent } from './components/list-requests-to-register/list-requests-to-register.component';
import { RejectRequestToRegisterComponent } from './components/reject-request-to-register/reject-request-to-register.component';
import { ApproveRequestToRegisterComponent } from './components/approve-request-to-register/approve-request-to-register.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { ListOfRoomsComponent } from './components/list-of-rooms/list-of-rooms.component';
import { AddClinicComponent } from './components/add-clinic/add-clinic.component';
import { ListClinicsComponent } from './components/list-clinics/list-clinics.component';
import { SearchRoomsComponent } from './components/search-rooms/search-rooms.component';
import { PatientSearchClinicsComponent } from './components/patient-search-clinics/patient-search-clinics.component';

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
    ListOfExaminationTypesComponent,
    AddExaminationTypeComponent,
    ListRequestsToRegisterComponent,
    RejectRequestToRegisterComponent,
    ApproveRequestToRegisterComponent,
    AddRoomComponent,
    ListOfRoomsComponent,
    AddClinicComponent,
    ListClinicsComponent,
    SearchRoomsComponent,
    PatientSearchClinicsComponent,
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
  entryComponents: [
    ListOfExaminationTypesComponent,
    AddExaminationTypeComponent,
    ListOfDoctorsComponent,
    AddDoctorComponent,
    ListRequestsToRegisterComponent,
    RejectRequestToRegisterComponent,
    ApproveRequestToRegisterComponent,
    ListOfRoomsComponent,
    AddRoomComponent,
    ListClinicsComponent,
    AddClinicComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
