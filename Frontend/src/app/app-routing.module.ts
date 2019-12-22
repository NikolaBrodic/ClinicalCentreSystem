import { EditPersonalInformationNurseComponent } from './components/edit/edit-personal-information-nurse/edit-personal-information-nurse.component';
import { EditPersonalInformationDoctorComponent } from './components/edit/edit-personal-information-doctor/edit-personal-information-doctor.component';
import { EditPersonalInformationClinicAdminComponent } from './components/edit/edit-personal-information-clinic-admin/edit-personal-information-clinic-admin.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { ListOfCreatedPredefinedExaminationComponent } from './components/list-of-created-predefined-examination/list-of-created-predefined-examination.component';
import { PatientClinicDetailsComponent } from './components/patient-clinic-details/patient-clinic-details.component';
import { MedicalStaffGuard } from './guards/medical.staff.guard';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { NurseGuard } from './guards/nurse.guard';
import { ListOfPatientsWithSearchComponent } from './components/list-of-patients-with-search/list-of-patients-with-search.component';
import { DoctorGuard } from './guards/doctor.guard';
import { ClinicAdminGuard } from './guards/clinic.admin.guard';
import { PatientGuard } from './guards/patient.guard';
import { ClinicalCentreAdminGuard } from './guards/clinical.centre.admin.guard';
import { NonAuthenticatedErrorPageComponent } from './components/non-authenticated-error-page/non-authenticated-error-page.component';
import { NonAuthorizedErrorPageComponent } from './components/non-authorized-error-page/non-authorized-error-page.component';

import { DoctorsExaminationComponent } from './components/doctors-examination/doctors-examination.component';
import { ListExaminationsRequestComponent } from './components/list-examinations-request/list-examinations-request.component';
import { ListClinicAdministratorsComponent } from './components/list-clinic-administrators/list-clinic-administrators.component';
import { SearchRoomsComponent } from './components/search-rooms/search-rooms.component';
import { ListOfRoomsComponent } from './components/list-of-rooms/list-of-rooms.component';
import { ListOfExaminationTypesComponent } from './components/list-of-examination-types/list-of-examination-types.component';
import { ListRequestsToRegisterComponent } from './components/list-requests-to-register/list-requests-to-register.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPatientComponent } from './components/login-patient/login-patient.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { PendingApprovalPatientComponent } from './components/pending-approval-patient/pending-approval-patient.component';
import { ErrorComponent } from './components/error/error.component';
import { ListClinicsComponent } from './components/list-clinics/list-clinics.component';
import { ListNursesComponent } from './components/list-nurses/list-nurses.component';
import { WorkCalendarComponent } from './components/work-calendar/work-calendar.component';
import { ListDiagnosisComponent } from './components/list-diagnosis/list-diagnosis.component';
import { ListMedicinesComponent } from './components/list-medicines/list-medicines.component';
import { ExaminationComponent } from './components/examination/examination.component';
import { AdminsGuard } from './guards/admins.guard';
import { EditClinicProfileComponent } from './components/edit/edit-clinic-profile/edit-clinic-profile.component';


const routes: Routes = [
  {
    path: '',
    component: LoginPatientComponent,
  },

  //***************** USER *****************
  {
    path: 'user/login',
    component: LoginPatientComponent,
  },
  {
    path: 'user/change-password',
    component: UserChangePasswordComponent,
  },
  {
    path: 'patient/register',
    component: RegisterPatientComponent,
  },
  {
    path: 'patient/pending-approval',
    component: PendingApprovalPatientComponent
  },

  //***************** CLINIC ADMIN *****************

  {
    path: 'clinic-admin/clinic-profile',
    component: EditClinicProfileComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/doctors',
    component: ListOfDoctorsComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/examination-types',
    component: ListOfExaminationTypesComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/price-list',
    component: PriceListComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/rooms',
    component: ListOfRoomsComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/search-rooms',
    component: SearchRoomsComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/nurses',
    component: ListNursesComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/examination/get-awaiting',
    component: ListExaminationsRequestComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/predefined-examination/get-all',
    component: ListOfCreatedPredefinedExaminationComponent,
    canActivate: [ClinicAdminGuard],
  },
  {
    path: 'clinic-admin/edit-personal-information',
    component: EditPersonalInformationClinicAdminComponent,
    canActivate: [ClinicAdminGuard],
  },

  //********************* CLINICAL CENTRE ADMIN ***************
  {
    path: 'clinical-centre-admin/requests-to-register',
    component: ListRequestsToRegisterComponent,
    canActivate: [ClinicalCentreAdminGuard]
  },
  {
    path: 'clinical-centre-admin/clinics',
    component: ListClinicsComponent,
    canActivate: [ClinicalCentreAdminGuard]
  },
  {
    path: 'clinical-centre-admin/clinic-administrators',
    component: ListClinicAdministratorsComponent,
    canActivate: [ClinicalCentreAdminGuard]
  },
  {
    path: 'clinical-centre-admin/diagnosis',
    component: ListDiagnosisComponent,
    canActivate: [ClinicalCentreAdminGuard]
  },
  {
    path: 'clinical-centre-admin/medicines',
    component: ListMedicinesComponent,
    canActivate: [ClinicalCentreAdminGuard]
  },



  //*************************** DOCTOR **********************
  {
    path: 'doctor/examinations',
    component: DoctorsExaminationComponent,
    canActivate: [DoctorGuard],
  },
  {
    path: 'doctor/edit-personal-information',
    component: EditPersonalInformationDoctorComponent,
    canActivate: [DoctorGuard],
  },
  {
    path: 'doctor/examination',
    component: ExaminationComponent,
    canActivate: [DoctorGuard],
  },
  //****************** MEDICAL STAFF *********
  {
    path: 'patient/profile/:id',
    component: PatientProfileComponent,
    canActivate: [MedicalStaffGuard]
  },
  {
    path: 'medical-staff/patients',
    component: ListOfPatientsWithSearchComponent,
    canActivate: [MedicalStaffGuard],
  },
  {
    path: 'medical-staff/work-calendar',
    component: WorkCalendarComponent,
    canActivate: [MedicalStaffGuard],
  },

  //********************* PATIENT ***************************
  {
    path: 'patient/clinic/:id/details',
    component: PatientClinicDetailsComponent,
    canActivate: [PatientGuard]
  },

  //********************* NURSE ***************************
  {
    path: 'nurse/edit-personal-information',
    component: EditPersonalInformationNurseComponent,
    canActivate: [NurseGuard],
  },
  //******************* ERROR PAGES ************************
  {
    path: 'error/non-authenticated',
    component: NonAuthenticatedErrorPageComponent,
  },
  {
    path: 'error/non-authorized',
    component: NonAuthorizedErrorPageComponent
  },
  {
    path: '**',
    component: ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
