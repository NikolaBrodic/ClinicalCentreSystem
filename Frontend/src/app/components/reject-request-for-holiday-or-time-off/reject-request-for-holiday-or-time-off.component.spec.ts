import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { RejectRequestForHolidayOrTimeOffComponent } from './reject-request-for-holiday-or-time-off.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RejectRequestForHolidayOrTimeOffComponent', () => {
    let component: RejectRequestForHolidayOrTimeOffComponent;
    let fixture: ComponentFixture<RejectRequestForHolidayOrTimeOffComponent>;

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
                }),
                ReactiveFormsModule,
                FormsModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ],
            providers: [TimeOffNurseService, TimeOffDoctorService,
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, DialogStub }],
            declarations: [RejectRequestForHolidayOrTimeOffComponent,],

        });

        fixture = TestBed.createComponent(RejectRequestForHolidayOrTimeOffComponent);
        component = fixture.componentInstance;

        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        const request = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING');
        const dataDoctor = { requestForHolidayOrTimeOff: request, for: "Doctor" };

        component.data = dataDoctor;
        fixture.detectChanges();
    });


    it('should NOT call reject() when clicked on reject button', () => {
        let spy = spyOn(component, 'reject');

        const de = fixture.debugElement.query(By.css('.mt-3'));
        const el = de.nativeElement;
        const button = el.querySelector('button');
        button.click();

        expect(spy).not.toHaveBeenCalled();
    });

    it('should call reject() when clicked on reject button', () => {
        component.ngOnInit();
        component.rejectRequestForm.patchValue(
            {
                'reason': "Some reason.",
            }
        );
        fixture.detectChanges();
        let spy = spyOn(component, 'reject');

        const de = fixture.debugElement.query(By.css('.mt-3'));
        const el = de.nativeElement;
        const button = el.querySelector('button');
        button.click();

        expect(spy).toHaveBeenCalled();
    });
});