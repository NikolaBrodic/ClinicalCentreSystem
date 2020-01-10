import { TimeOffDoctorService } from "src/app/services/time-off-doctor.service";
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { RequestsForHolidayOrTimeOff } from 'src/app/models/requestForHolidayOrTimeOff';
import { DateTimeInterval } from 'src/app/models/dateTimeInterval';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { RejectRequestForHolidayOrTimeOffComponent } from './reject-request-for-holiday-or-time-off.component';
describe('RejectRequestForHolidayOrTimeOffComponentUnitTests', () => {
    let componentDoctor: RejectRequestForHolidayOrTimeOffComponent;
    let componentNurse: RejectRequestForHolidayOrTimeOffComponent;
    let timeOffDoctorService: TimeOffDoctorService;
    let timeOffNurseService: TimeOffNurseService;

    beforeEach(() => {
        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        const timeOffBeforeAccept: RequestsForHolidayOrTimeOff = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING');
        const dataDoctor = { requestForHolidayOrTimeOff: timeOffBeforeAccept, for: "Doctor" };
        const dataNurse = { requestForHolidayOrTimeOff: timeOffBeforeAccept, for: "Nurse" };
        timeOffDoctorService = new TimeOffDoctorService(null);
        timeOffNurseService = new TimeOffNurseService(null);
        componentDoctor = new RejectRequestForHolidayOrTimeOffComponent(null, timeOffDoctorService, timeOffNurseService, null, dataDoctor);
        componentNurse = new RejectRequestForHolidayOrTimeOffComponent(null, timeOffDoctorService, timeOffNurseService, null, dataNurse);
    });

    it('reject() for doctor should change status of time off/holiday', () => {
        let spy = spyOn(componentDoctor, 'reject').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        componentDoctor.reject();

        expect(spy).toHaveBeenCalled();

    });

    it('reject() for nurse should change status of time off/holiday', () => {
        let spy = spyOn(componentNurse, 'reject').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        componentNurse.reject();

        expect(spy).toHaveBeenCalled();

    });

    it('should create a form with one control', () => {
        componentDoctor.ngOnInit();
        expect(componentDoctor.rejectRequestForm.contains('reason')).toBeTruthy();
    });

    it('should make the reason control required', () => {
        componentDoctor.ngOnInit();
        let control = componentDoctor.rejectRequestForm.get('reason');

        control.setValue('');

        expect(control.valid).toBeFalsy();
    });
});
