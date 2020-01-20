import { Observable } from 'rxjs';
import { RequestsForHolidayOrTimeOffComponent } from "./requests-for-holiday-or-time-off.component";
import { TimeOffDoctorService } from 'src/app/services/time-off-doctor.service';
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { MatDialog } from '@angular/material';

describe('RequestForHolidayOrTimeOffComponentUnitTests', () => {
    let component: RequestsForHolidayOrTimeOffComponent;
    let timeOffDoctorService: TimeOffDoctorService;
    let timeOffNurseService: TimeOffNurseService;
    let dialog: MatDialog;

    beforeEach(() => {
        timeOffDoctorService = new TimeOffDoctorService(null);
        timeOffNurseService = new TimeOffNurseService(null);
        dialog = new MatDialog(null, null, null, null, null, null, null);
        component = new RequestsForHolidayOrTimeOffComponent(timeOffDoctorService, timeOffNurseService, dialog);
    });

    it('should set requestsDataSource property with the items returned from the doctor server', () => {
        component.forDoctorOrNurse = "Doctor";
        spyOn(timeOffDoctorService, 'getRequests').and.returnValue(Observable.create(obs => {
            obs.next([1, 2, 3]);
        }));
        component.ngOnInit();

        expect(component.requestsDataSource.data.length).toBe(3);
    });

    it('should set requestsDataSource property with the items returned from the nurse server', () => {
        component.forDoctorOrNurse = "Nurse";
        spyOn(timeOffNurseService, 'getRequests').and.returnValue(Observable.create(obs => {
            obs.next([1]);
        }));
        component.ngOnInit();

        expect(component.requestsDataSource.data.length).toBe(1);
    });

    it('should open approve dialog', () => {
        let spy = spyOn(dialog, 'open').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        component.openApproveDialog(null);

        expect(spy).toHaveBeenCalled();
    });

    it('should open reject dialog', () => {
        let spy = spyOn(dialog, 'open').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        component.openRejectDialog(null);

        expect(spy).toHaveBeenCalled();
    });
});
