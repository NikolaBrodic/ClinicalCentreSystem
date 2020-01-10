import { RejectRequestToRegisterComponent } from './reject-request-to-register.component';
import { Observable } from 'rxjs';
import { RequestToRegisterService } from './../../services/request-to.register.service';

describe('RejectRequestToRegisterComponent', () => {
    let component: RejectRequestToRegisterComponent;
    let service: RequestToRegisterService;
    const data = {
        requsetToRegister: { id: 1, firstName: 'Petar', lastName: 'Petrovic', email: 'petar.petrovic@somemail.com', status: 'AWAITING_APPROVAL' }
    };

    beforeEach(() => {
        service = new RequestToRegisterService(null);
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
});
