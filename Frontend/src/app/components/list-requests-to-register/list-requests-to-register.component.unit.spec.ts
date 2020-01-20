import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RequestToRegisterService } from './../../services/request-to.register.service';
import { ListRequestsToRegisterComponent } from './list-requests-to-register.component';

describe('ListRequestsToRegisterComponent', () => {
    let component: ListRequestsToRegisterComponent;
    let service: RequestToRegisterService;
    let dialog: MatDialog;

    beforeEach(() => {
        service = new RequestToRegisterService(null);
        dialog = new MatDialog(null, null, null, null, null, null, null);
        component = new ListRequestsToRegisterComponent(service, dialog);
    });

    it('should set requestToRegisterDataSource property with the items returned from the server', () => {
        let requests = [
            { id: 1, firstName: 'Petar', lastName: 'Petrovic', email: 'petar.petrovic@somemail.com', status: 'AWAITING_APPROVAL' },
            { id: 2, firstName: 'Milan', lastName: 'Milanovic', email: 'milan.milanovic@somemail.com', status: 'AWAITING_APPROVAL' }
        ];

        spyOn(service, 'getRequestsToRegister').and.returnValue(Observable.create(obs => {
            obs.next(requests);
        }));

        component.ngOnInit();

        expect(component.requestToRegisterDataSource.data.length).toBe(requests.length);
    });

    it('should open approve request dialog', () => {
        let spy = spyOn(dialog, 'open').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        component.openApproveDialog(null);

        expect(spy).toHaveBeenCalled();
    });

    it('should open reject request dialog', () => {
        let spy = spyOn(dialog, 'open').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        component.openRejectDialog(null);

        expect(spy).toHaveBeenCalled();
    });
});
