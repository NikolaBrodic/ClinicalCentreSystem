import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { TimeOffDoctorService } from "src/app/services/time-off-doctor.service";
import { ApproveRequestForHolidayOrTimeOffComponent } from './approve-request-for-holiday-or-time-off.component';
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { RequestsForHolidayOrTimeOff } from 'src/app/models/requestForHolidayOrTimeOff';
import { DateTimeInterval } from 'src/app/models/dateTimeInterval';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemoMaterialModule } from 'src/app/material-module';

describe('ApproveRequestForHolidayOrTimeOffComponentUnitTests', () => {
    let componentDoctor: ApproveRequestForHolidayOrTimeOffComponent;
    let componentNurse: ApproveRequestForHolidayOrTimeOffComponent;
    let timeOffDoctorService: TimeOffDoctorService;
    let timeOffNurseService: TimeOffNurseService;

    class DialogStub {
        close() {
        }
    }
    class ToastrServiceStub {
        success() {
        }
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                DemoMaterialModule
            ],
            providers: [TimeOffDoctorService, TimeOffNurseService, {
                provide: MatDialogRef, useClass: DialogStub
            }, {
                    provide: ToastrService, useClass: ToastrServiceStub
                }],
            declarations: [ApproveRequestForHolidayOrTimeOffComponent],

        });
        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        const timeOffBeforeAccept: RequestsForHolidayOrTimeOff = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING');

        const dataDoctor = { requestForHolidayOrTimeOff: timeOffBeforeAccept, for: "Doctor" };
        const dataNurse = { requestForHolidayOrTimeOff: timeOffBeforeAccept, for: "Nurse" };

        timeOffDoctorService = new TimeOffDoctorService(null);
        timeOffNurseService = new TimeOffNurseService(null);

        componentDoctor = new ApproveRequestForHolidayOrTimeOffComponent(null, timeOffDoctorService, timeOffNurseService, null, dataDoctor);
        componentNurse = new ApproveRequestForHolidayOrTimeOffComponent(null, timeOffDoctorService, timeOffNurseService, null, dataNurse);

    });

    it('approve() for doctor should call service to approve request on the server', () => {
        let spy = spyOn(timeOffDoctorService, 'approve').and.returnValue(Observable.create(obs => {
            obs.next({ msg: 'success' });
        }));
        let dialog = TestBed.get(MatDialogRef);
        componentDoctor.dialogRef = dialog;
        let spyDialog = spyOn(dialog, 'close');

        let toastr = TestBed.get(ToastrService);
        let spyToastr = spyOn(toastr, 'success');
        componentDoctor.toastr = toastr;

        componentDoctor.approve();

        expect(spy).toHaveBeenCalled();
        expect(spyDialog).toHaveBeenCalled();
        expect(spyToastr).toHaveBeenCalled();
    });

    it('approve() for nurse should call service to approve request on the server', () => {
        let spy = spyOn(timeOffNurseService, 'approve').and.returnValue(Observable.create(obs => {
            obs.next({ msg: 'success' });
        }));

        let dialog = TestBed.get(MatDialogRef);
        componentNurse.dialogRef = dialog;
        let spyDialog = spyOn(dialog, 'close');

        let toastr = TestBed.get(ToastrService);
        let spyToastr = spyOn(toastr, 'success');
        componentNurse.toastr = toastr;


        componentNurse.approve();

        expect(spy).toHaveBeenCalled();
        expect(spyDialog).toHaveBeenCalled();
        expect(spyToastr).toHaveBeenCalled();

    });
});
