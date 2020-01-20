import { MatDialogRef } from '@angular/material/dialog';
import { DemoMaterialModule } from './../../material-module';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RequestToRegister } from './../../models/request-to-register';
import { ApproveRequestToRegisterComponent } from './approve-request-to-register.component';
import { Observable } from 'rxjs';
import { RequestToRegisterService } from './../../services/request-to.register.service';

class MatDialogRefStub {
    close() {
    }
}
class ToastrServiceStub {
    success() {
    }
}

describe('ApproveRequestToRegisterComponent', () => {
    let component: ApproveRequestToRegisterComponent;
    let service: RequestToRegisterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                DemoMaterialModule
            ],
            providers: [
                RequestToRegisterService,
                { provide: MatDialogRef, useClass: MatDialogRefStub },
                { provide: ToastrService, useClass: ToastrServiceStub }
            ],
            declarations: [ApproveRequestToRegisterComponent]
        });

        const data = {
            requsetToRegister: new RequestToRegister('Petar', 'Petrovic', 'petar.petrovic@somemail.com', 'AWAITING_APPROVAL', 1)
        };

        service = TestBed.get(RequestToRegisterService);
        component = new ApproveRequestToRegisterComponent(null, service, null, data);
    });

    it('should call service to approve request to register on the server', () => {
        let spy = spyOn(service, 'approve').and.returnValue(Observable.create(obs => {
            obs.next({ msg: 'success' });
        }));
        let dialog = TestBed.get(MatDialogRef);
        component.dialogRef = dialog;
        let spyDialog = spyOn(dialog, 'close');

        let toastr = TestBed.get(ToastrService);
        let spyToastr = spyOn(toastr, 'success');
        component.toastr = toastr;

        component.approve();

        expect(spy).toHaveBeenCalled();
        expect(spyDialog).toHaveBeenCalled();
        expect(spyToastr).toHaveBeenCalled();
    });
});
