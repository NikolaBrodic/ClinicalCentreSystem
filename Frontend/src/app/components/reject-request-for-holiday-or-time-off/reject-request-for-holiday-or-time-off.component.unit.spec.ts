import { TimeOffDoctorService } from "src/app/services/time-off-doctor.service";
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { RequestsForHolidayOrTimeOff } from 'src/app/models/requestForHolidayOrTimeOff';
import { DateTimeInterval } from 'src/app/models/dateTimeInterval';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { RejectRequestForHolidayOrTimeOffComponent } from './reject-request-for-holiday-or-time-off.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemoMaterialModule } from 'src/app/material-module';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('RejectRequestForHolidayOrTimeOffComponentUnitTests', () => {
    let componentDoctor: RejectRequestForHolidayOrTimeOffComponent;
    let componentNurse: RejectRequestForHolidayOrTimeOffComponent;
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
                DemoMaterialModule,
                ReactiveFormsModule,
                FormsModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ],
            providers: [TimeOffDoctorService, TimeOffNurseService, {
                provide: MatDialogRef, useClass: DialogStub
            }, {
                    provide: ToastrService, useClass: ToastrServiceStub
                }],
            declarations: [RejectRequestForHolidayOrTimeOffComponent],

        });
        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        const timeOffBeforeAccept: RequestsForHolidayOrTimeOff = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING');
        const dataDoctor = { requestForHolidayOrTimeOff: timeOffBeforeAccept, for: "Doctor" };
        const dataNurse = { requestForHolidayOrTimeOff: timeOffBeforeAccept, for: "Nurse" };

        timeOffDoctorService = new TimeOffDoctorService(null);
        timeOffNurseService = new TimeOffNurseService(null);

        componentDoctor = new RejectRequestForHolidayOrTimeOffComponent(null, timeOffDoctorService, timeOffNurseService, null, dataDoctor);
        componentNurse = new RejectRequestForHolidayOrTimeOffComponent(null, timeOffDoctorService, timeOffNurseService, null, dataNurse);
    });

    it('reject() for doctor should call service to reject request on the server', () => {
        componentDoctor.ngOnInit();
        let control = componentDoctor.rejectRequestForm.get('reason');
        control.setValue('Some reason.');

        let spy = spyOn(timeOffDoctorService, 'reject').and.returnValue(Observable.create(obs => {
            obs.next({ msg: 'success' });
        }));

        let dialog = TestBed.get(MatDialogRef);
        componentDoctor.dialogRef = dialog;
        let spyDialog = spyOn(dialog, 'close');

        let toastr = TestBed.get(ToastrService);
        let spyToastr = spyOn(toastr, 'success');
        componentDoctor.toastr = toastr;

        componentDoctor.reject();

        expect(spy).toHaveBeenCalled();
        expect(spyDialog).toHaveBeenCalled();
        expect(spyToastr).toHaveBeenCalled();
    });

    it('reject() for nurse should call service to reject request on the server', () => {
        componentNurse.ngOnInit();
        let control = componentNurse.rejectRequestForm.get('reason');
        control.setValue('Some reason.');

        let spy = spyOn(timeOffNurseService, 'reject').and.returnValue(Observable.create(obs => {
            obs.next({ msg: 'success' });
        }));

        let dialog = TestBed.get(MatDialogRef);
        componentNurse.dialogRef = dialog;
        let spyDialog = spyOn(dialog, 'close');

        let toastr = TestBed.get(ToastrService);
        let spyToastr = spyOn(toastr, 'success');
        componentNurse.toastr = toastr;

        componentNurse.reject();

        expect(spy).toHaveBeenCalled();
        expect(spyDialog).toHaveBeenCalled();
        expect(spyToastr).toHaveBeenCalled();
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
