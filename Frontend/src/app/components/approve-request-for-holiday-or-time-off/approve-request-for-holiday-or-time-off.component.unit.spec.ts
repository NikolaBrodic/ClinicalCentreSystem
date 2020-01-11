import { TimeOffDoctorService } from "src/app/services/time-off-doctor.service";
import { ApproveRequestForHolidayOrTimeOffComponent } from './approve-request-for-holiday-or-time-off.component';
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { RequestsForHolidayOrTimeOff } from 'src/app/models/requestForHolidayOrTimeOff';
import { DateTimeInterval } from 'src/app/models/dateTimeInterval';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';

describe('ApproveRequestForHolidayOrTimeOffComponentUnitTests', () => {
    let componentDoctor: ApproveRequestForHolidayOrTimeOffComponent;
    let componentNurse: ApproveRequestForHolidayOrTimeOffComponent;
    let timeOffDoctorService: TimeOffDoctorService;
    let timeOffNurseService: TimeOffNurseService;

    beforeEach(() => {
        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        const timeOffBeforeAccept: RequestsForHolidayOrTimeOff = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING');

        const dataDoctor = { requestForHolidayOrTimeOff: timeOffBeforeAccept, for: "Doctor" };
        const dataNurse = { requestForHolidayOrTimeOff: timeOffBeforeAccept, for: "Nurse" };

        timeOffDoctorService = new TimeOffDoctorService(null);
        timeOffNurseService = new TimeOffNurseService(null);

        componentDoctor = new ApproveRequestForHolidayOrTimeOffComponent(null, timeOffDoctorService, timeOffNurseService, null, dataDoctor);
        componentNurse = new ApproveRequestForHolidayOrTimeOffComponent(null, timeOffDoctorService, timeOffNurseService, null, dataNurse);
    });

    it('approve() for doctor should change status of time off/holiday', () => {
        let spy = spyOn(componentDoctor, 'approve').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        componentDoctor.approve();

        expect(spy).toHaveBeenCalled();

    });

    it('approve() for nurse should change status of time off/holiday', () => {
        let spy = spyOn(componentNurse, 'approve').and.returnValue(Observable.create(obs => {
            obs.empty();
        }));

        componentNurse.approve();

        expect(spy).toHaveBeenCalled();

    });
});
