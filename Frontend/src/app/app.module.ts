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
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { ListRequestsToRegisterComponent } from './components/list-requests-to-register/list-requests-to-register.component';
import { RejectRequestToRegisterComponent } from './components/reject-request-to-register/reject-request-to-register.component';
import { ApproveRequestToRegisterComponent } from './components/approve-request-to-register/approve-request-to-register.component';

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
    ListRequestsToRegisterComponent,
    RejectRequestToRegisterComponent,
    ApproveRequestToRegisterComponent,
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
    ListaOfExaminationTypesComponent,
    AddExaminationTypeComponent,
    ListOfDoctorsComponent,
    AddDoctorComponent,
    ListRequestsToRegisterComponent,
    RejectRequestToRegisterComponent,
    ApproveRequestToRegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
