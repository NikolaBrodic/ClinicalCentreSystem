import { AddPredefinedExaminationComponent } from './components/add-predefined-examination/add-predefined-examination.component';
import { ListOfCreatedPredefinedExaminationComponent } from './components/list-of-created-predefined-examination/list-of-created-predefined-examination.component';
import { MedicalStaffGuard } from './guards/medical.staff.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { NurseGuard } from './guards/nurse.guard';
import { PatientGuard } from './guards/patient.guard';
import { ClinicAdminGuard } from './guards/clinic.admin.guard';
import { ClinicalCentreAdminGuard } from './guards/clinical.centre.admin.guard';
import { ErrorInterceptor } from './interseptors/error.interceptor';
import { ListOfExaminationTypesComponent } from './components/list-of-examination-types/list-of-examination-types.component';
import { TokenInterceptor } from './interseptors/token.interceptor';
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
import { ListClinicAdministratorsComponent } from './components/list-clinic-administrators/list-clinic-administrators.component';
import { AddClinicAdministratorComponent } from './components/add-clinic-administrator/add-clinic-administrator.component';
import { ListNursesComponent } from './components/list-nurses/list-nurses.component';
import { AddNurseComponent } from './components/add-nurse/add-nurse.component';

import { ListExaminationsRequestComponent } from './components/list-examinations-request/list-examinations-request.component';
import { DoctorsExaminationComponent } from './components/doctors-examination/doctors-examination.component';
import { NonAuthenticatedErrorPageComponent } from './components/non-authenticated-error-page/non-authenticated-error-page.component';
import { NonAuthorizedErrorPageComponent } from './components/non-authorized-error-page/non-authorized-error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ListOfPatientsWithSearchComponent } from './components/list-of-patients-with-search/list-of-patients-with-search.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientClinicDetailsComponent } from './components/patient-clinic-details/patient-clinic-details.component';
import { AxiomSchedulerModule } from 'axiom-scheduler';
import { WorkCalendarComponent } from './components/work-calendar/work-calendar.component';
import { ListDiagnosisComponent } from './components/list-diagnosis/list-diagnosis.component';
import { AddDiagnoseComponent } from './components/add-diagnose/add-diagnose.component';
import { ListMedicinesComponent } from './components/list-medicines/list-medicines.component';
import { AddMedicineComponent } from './components/add-medicine/add-medicine.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { EditPriceListComponent } from './components/edit/edit-price-list/edit-price-list.component';
import { EditExaminationTypeComponent } from './components/edit/edit-examination-type/edit-examination-type.component';
import { EditRoomComponent } from './components/edit/edit-room/edit-room.component';
import { EditPersonalInformationClinicAdminComponent } from './components/edit/edit-personal-information-clinic-admin/edit-personal-information-clinic-admin.component';
import { EditPersonalInformationDoctorComponent } from './components/edit/edit-personal-information-doctor/edit-personal-information-doctor.component';
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
    ListClinicAdministratorsComponent,
    AddClinicAdministratorComponent,
    ListNursesComponent,
    AddNurseComponent,
    ListExaminationsRequestComponent,
    DoctorsExaminationComponent,
    NonAuthenticatedErrorPageComponent,
    NonAuthorizedErrorPageComponent,
    HeaderComponent,
    ListOfPatientsWithSearchComponent,
    PatientProfileComponent,
    PatientClinicDetailsComponent,
    WorkCalendarComponent,
    ListOfCreatedPredefinedExaminationComponent,
    AddPredefinedExaminationComponent,
    ListDiagnosisComponent,
    AddDiagnoseComponent,
    ListMedicinesComponent,
    AddMedicineComponent,
    EditExaminationTypeComponent,
    EditRoomComponent,
    PriceListComponent,
    EditPriceListComponent,
    EditExaminationTypeComponent,
    EditPersonalInformationClinicAdminComponent,
    EditPersonalInformationDoctorComponent,

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
    AxiomSchedulerModule,
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
    AddClinicComponent,
    ListClinicAdministratorsComponent,
    AddClinicAdministratorComponent,
    ListNursesComponent,
    AddNurseComponent,
    ListOfCreatedPredefinedExaminationComponent,
    AddPredefinedExaminationComponent,
    ListDiagnosisComponent,
    AddDiagnoseComponent,
    ListMedicinesComponent,
    AddMedicineComponent,
    EditExaminationTypeComponent,
    EditRoomComponent,
    EditPriceListComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ClinicalCentreAdminGuard,
    ClinicAdminGuard,
    PatientGuard,
    DoctorGuard,
    NurseGuard,
    MedicalStaffGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
