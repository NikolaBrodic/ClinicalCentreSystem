import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { DemoMaterialModule } from './../../material-module';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestToRegister } from './../../models/request-to-register';
import { RejectRequestToRegisterComponent } from './reject-request-to-register.component';
import { RequestToRegisterService } from './../../services/request-to.register.service';
import { Observable } from 'rxjs';

class MatDialogRefStub {
    close() {
    }
}
class ToastrServiceStub {
    success() {
    }
}

describe('RejectRequestToRegisterComponent', () => {
    let component: RejectRequestToRegisterComponent;
    let service: RequestToRegisterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                DemoMaterialModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                RequestToRegisterService,
                { provide: MatDialogRef, useClass: MatDialogRefStub },
                { provide: ToastrService, useClass: ToastrServiceStub }
            ],
            declarations: [RejectRequestToRegisterComponent]
        });

        const data = {
            requsetToRegister: new RequestToRegister('Petar', 'Petrovic', 'petar.petrovic@somemail.com', 'AWAITING_APPROVAL', 1)
        };

        service = TestBed.get(RequestToRegisterService);
        component = new RejectRequestToRegisterComponent(null, service, null, data);
    });

    it('should create a form with one control', () => {
        component.ngOnInit();

        expect(component.rejectRequestToRegisterForm.contains('reason')).toBeTruthy();
    });

    it('should make the reason control required', () => {
        component.ngOnInit();
        let control = component.rejectRequestToRegisterForm.get('reason');
        control.setValue('');

        expect(control.valid).toBeFalsy();
    });

    it('should call service to reject request to register on the server', () => {
        component.ngOnInit();
        component.rejectRequestToRegisterForm.patchValue({ 'reason': 'Some reason' });

        let spy = spyOn(service, 'reject').and.returnValue(Observable.create(obs => {
            obs.next({ msg: 'success' });
        }));
        let dialog = TestBed.get(MatDialogRef);
        component.dialogRef = dialog;
        let spyDialog = spyOn(dialog, 'close');

        let toastr = TestBed.get(ToastrService);
        let spyToastr = spyOn(toastr, 'success');
        component.toastr = toastr;

        component.reject();

        expect(spy).toHaveBeenCalled();
        expect(spyDialog).toHaveBeenCalled();
        expect(spyToastr).toHaveBeenCalled();
    });
});
