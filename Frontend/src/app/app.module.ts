import { RouterModule, Routes } from '@angular/router';
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

const appRoutes: Routes = [
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
    path: 'patient/pending-approval',
    component: PendingApprovalPatientComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterPatientComponent,
    LoginPatientComponent,
    PendingApprovalPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
