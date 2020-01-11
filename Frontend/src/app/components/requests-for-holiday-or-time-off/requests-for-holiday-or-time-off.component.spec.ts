import { RequestsForHolidayOrTimeOff } from './../../models/requestForHolidayOrTimeOff';
import { TestBed, ComponentFixture, async, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RequestsForHolidayOrTimeOffComponent } from './requests-for-holiday-or-time-off.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemoMaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MatSelectModule, MatDialog, MatTableDataSource } from '@angular/material';
import { TimeOffDoctorService } from 'src/app/services/time-off-doctor.service';
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { DateTimeInterval } from 'src/app/models/dateTimeInterval';
import { DateTime } from 'luxon';

describe('RequestsForHolidayOrTimeOffComponent', () => {
    let component: RequestsForHolidayOrTimeOffComponent;
    let fixture: ComponentFixture<RequestsForHolidayOrTimeOffComponent>;
    let requests: RequestsForHolidayOrTimeOff[];
    class DialogStub {
        open(component: any, data: any) {
        }
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
                DemoMaterialModule,
                FormsModule,
                MatSelectModule,
                NoopAnimationsModule
            ],
            providers: [TimeOffDoctorService, TimeOffNurseService, {
                provide: MatDialog, useClass: DialogStub
            }],
            declarations: [RequestsForHolidayOrTimeOffComponent,],

        });

        fixture = TestBed.createComponent(RequestsForHolidayOrTimeOffComponent);
        component = fixture.componentInstance;
        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        requests = [
            new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING')
        ];
        component.requestsDataSource = new MatTableDataSource(requests);
        fixture.detectChanges();
    });

    it('should call open approve dialog when clicked on approve button', () => {
        let dialog = TestBed.get(MatDialog);
        let spy = spyOn(dialog, 'open');

        const de = fixture.debugElement.query(By.css('table'));
        const el = de.nativeElement;
        const button = el.querySelectorAll('button')[0];
        button.click();
        expect(spy).toHaveBeenCalled();
    });

    it('should call open reject dialog when clicked on reject button', () => {
        let dialog = TestBed.get(MatDialog);
        let spy = spyOn(dialog, 'open');

        const de = fixture.debugElement.query(By.css('table'));
        const el = de.nativeElement;
        const button = el.querySelectorAll('button')[1];

        button.click();
        expect(spy).toHaveBeenCalled();
    });

    it('should call changeFor() when selection changed', () => {
        let spy = spyOn(component, 'fetchData');

        let de = fixture.debugElement.query(By.css('mat-select'));
        de.triggerEventHandler('selectionChange', { value: { id: 1 } });
        expect(spy).toHaveBeenCalled();
    });

});