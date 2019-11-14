import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPatientComponent } from './components/login-patient/login-patient.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { PendingApprovalPatientComponent } from './components/pending-approval-patient/pending-approval-patient.component';
import { ErrorComponent } from './components/error/error.component';
import { ListaOfExaminationTypesComponent } from './components/list-of-examination-types/list-of-examination-types.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPatientComponent,
  },
  {
    path: 'patient/login',
    component: LoginPatientComponent,
  },
  {
    path: 'patient/register',
    component: RegisterPatientComponent,
  },
  {
    path: 'clinicAdministrator/doctors',
    component: ListOfDoctorsComponent,
  },
  {
    path: 'clinicAdministrator/examinationTypes',
    component: ListaOfExaminationTypesComponent,
  },
  {
    path: 'user/changePssword',
    component: UserChangePasswordComponent,
  },
  {
    path: 'patient/pending-approval',
    component: PendingApprovalPatientComponent,
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
