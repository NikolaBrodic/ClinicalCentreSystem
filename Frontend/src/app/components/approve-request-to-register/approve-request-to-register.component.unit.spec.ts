import { ApproveRequestToRegisterComponent } from './approve-request-to-register.component';
import { Observable } from 'rxjs';
import { RequestToRegisterService } from './../../services/request-to.register.service';

describe('ApproveRequestToRegisterComponent', () => {
    let component: ApproveRequestToRegisterComponent;
    let service: RequestToRegisterService;
    const data = {
        requsetToRegister: { id: 1, firstName: 'Petar', lastName: 'Petrovic', email: 'petar.petrovic@somemail.com', status: 'AWAITING_APPROVAL' }
    };

    beforeEach(() => {
        service = new RequestToRegisterService(null);
        component = new ApproveRequestToRegisterComponent(null, service, null, data);
    });

    it('should approve request to register on the server', () => {
        let spy = spyOn(service, 'approve').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        component.approve();

        expect(spy).toHaveBeenCalled();
    });
});
