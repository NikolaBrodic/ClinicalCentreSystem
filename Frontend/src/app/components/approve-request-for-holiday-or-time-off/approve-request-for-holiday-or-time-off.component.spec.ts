import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApproveRequestForHolidayOrTimeOffComponent } from "./approve-request-for-holiday-or-time-off.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemoMaterialModule } from 'src/app/material-module';
import { ToastrModule } from 'ngx-toastr';
import { TimeOffDoctorService } from 'src/app/services/time-off-doctor.service';
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { RequestsForHolidayOrTimeOff } from 'src/app/models/requestForHolidayOrTimeOff';
import { DateTimeInterval } from 'src/app/models/dateTimeInterval';
import { DateTime } from 'luxon';
import { By } from '@angular/platform-browser';

describe('ApproveRequestForHolidayOrTimeOffComponent', () => {
    let component: ApproveRequestForHolidayOrTimeOffComponent;
    let fixture: ComponentFixture<ApproveRequestForHolidayOrTimeOffComponent>;

    class DialogStub {
        close() {
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                DemoMaterialModule,
                ToastrModule.forRoot({
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    preventDuplicates: true,
                })
            ],
            providers: [TimeOffNurseService, TimeOffDoctorService,
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, DialogStub }],
            declarations: [ApproveRequestForHolidayOrTimeOffComponent,],

        });

        fixture = TestBed.createComponent(ApproveRequestForHolidayOrTimeOffComponent);
        component = fixture.componentInstance;

        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        const request = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING');
        const dataDoctor = { requestForHolidayOrTimeOff: request, for: "Doctor" };

        component.data = dataDoctor;
        fixture.detectChanges();
    });


    it('should call approve() when clicked on approve button', () => {
        let spy = spyOn(component, 'approve');

        const de = fixture.debugElement.query(By.css('.mt-2'));
        const el = de.nativeElement;
        const button = el.querySelectorAll('button')[0];
        button.click();

        expect(spy).toHaveBeenCalled();
    });

});