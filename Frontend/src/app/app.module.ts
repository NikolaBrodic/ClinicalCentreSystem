import { DemoMaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListRequestsToRegisterComponent } from './components/list-requests-to-register/list-requests-to-register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RejectRequestToRegisterComponent } from './components/reject-request-to-register/reject-request-to-register.component';
import { ApproveRequestToRegisterComponent } from './components/approve-request-to-register/approve-request-to-register.component';

@NgModule({
  declarations: [
    AppComponent,
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
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ListRequestsToRegisterComponent, RejectRequestToRegisterComponent, ApproveRequestToRegisterComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
