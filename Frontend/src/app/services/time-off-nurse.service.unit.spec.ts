import { environment } from 'src/environments/environment';
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DateTimeInterval } from '../models/dateTimeInterval';
import { RequestsForHolidayOrTimeOff } from '../models/requestForHolidayOrTimeOff';
import { DateTime } from 'luxon';

describe('TimeOffNurseServiceUnitTests', () => {
    let service: TimeOffNurseService;
    let httpMock: HttpTestingController;
    const url = environment.baseUrl + environment.timeOffNurse;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                TimeOffNurseService
            ]
        });
        service = TestBed.get(TimeOffNurseService);
        httpMock = TestBed.get(HttpTestingController);

    });


    it("getRequests() should return all nurses's awaiting time off/holiday", () => {
        const awaitingTimeOffNurses = {
            data: [
                { id: 1, type: 'TIME_OFF', interval: '28.05.2020', firstName: 'Petar', lastName: 'Simic' },
                { id: 2, type: 'HOLIDAY', interval: 'Weaver', firstName: 'Tamara', lastName: 'Jovin' }
            ],
        };
        service.getRequests().subscribe((res) => {
            expect(res).toEqual(awaitingTimeOffNurses);
        });

        const request = httpMock.expectOne(`${url}/requests-for-holiday-or-time-off`);
        expect(request.request.method).toBe('GET');
        request.flush(awaitingTimeOffNurses);
    });

    it('approve() should change status of time off/holiday', () => {
        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        const timeOffBeforeAccept: RequestsForHolidayOrTimeOff = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING');
        const timeOffAfterAccept: RequestsForHolidayOrTimeOff = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'APPROVED');

        service.approve(timeOffBeforeAccept).subscribe({
            next: (result: RequestsForHolidayOrTimeOff) => {
                expect(result).toEqual(timeOffAfterAccept);
            }
        }
        );

        const request = httpMock.expectOne(`${url}/approve-request-for-holiday-or-time-off/1`);
        expect(request.request.method).toBe('PUT');
        request.flush(timeOffAfterAccept);
    });

    it('reject() should change status of time off/holiday', () => {
        const dateTimeInterval = new DateTimeInterval(1, DateTime.fromString("17.09.2020 09:00", 'dd.MM.yyyy HH:mm'), DateTime.fromString("19.09.2020 09:00", 'dd.MM.yyyy HH:mm'));
        const timeOffBeforeAccept: RequestsForHolidayOrTimeOff = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'AWAITING');
        const timeOffAfterReject: RequestsForHolidayOrTimeOff = new RequestsForHolidayOrTimeOff(1, 'HOLIDAY', dateTimeInterval, 'Petar', 'Stanisic', 'REJECT');

        service.reject(timeOffBeforeAccept.id, "Your request for holiday is rejected").subscribe({
            next: (result: RequestsForHolidayOrTimeOff) => {
                expect(result).toEqual(timeOffAfterReject);
            }
        }
        );

        const request = httpMock.expectOne(`${url}/reject-request-for-holiday-or-time-off/1`);
        expect(request.request.method).toBe('PUT');
        request.flush(timeOffAfterReject);
    });
});
