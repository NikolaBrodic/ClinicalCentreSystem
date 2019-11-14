import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaOfExaminationTypesComponent } from './components/list-of-examination-types/list-of-examination-types.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'patient/login',
    component: LoginComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
