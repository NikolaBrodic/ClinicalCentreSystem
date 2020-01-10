import { RequestToRegister } from './../models/request-to-register';
import { environment } from './../../environments/environment';
import { RequestToRegisterService } from './request-to.register.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('RequestToRegisterService', () => {
    let service: RequestToRegisterService;
    let httpMock: HttpTestingController;
    const url = environment.baseUrl + environment.patient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RequestToRegisterService]
        });

        service = TestBed.get(RequestToRegisterService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("getRequestsToRegister() should return awaiting requests to register from the server", () => {
        const requestsToRegister = {
            data: [
                { id: 1, firstName: 'Petar', lastName: 'Petrovic', email: 'petar.petrovic@somemail.com', status: 'AWAITING_APPROVAL' },
                { id: 2, firstName: 'Milan', lastName: 'Milanovic', email: 'milan.milanovic@somemail.com', status: 'AWAITING_APPROVAL' }
            ],
        };

        service.getRequestsToRegister().subscribe((res) => {
            expect(res).toEqual(requestsToRegister);
        });

        const req = httpMock.expectOne(url + '/all-requests-to-register');
        expect(req.request.method).toBe('GET');
        req.flush(requestsToRegister);
    });

    it('approve() should approve request to register', () => {
        const requestToRegisterBefore = new RequestToRegister('Petar', 'Petrovic', 'petar.petrovic@somemail.com', 'AWAITING_APPROVAL', 1);
        const requestToRegisterAfter = new RequestToRegister('Petar', 'Petrovic', 'petar.petrovic@somemail.com', 'APPROVED', 1);

        service.approve(requestToRegisterBefore).subscribe((res) => {
            expect(res).toEqual(requestToRegisterAfter);
        });

        const request = httpMock.expectOne(url + '/approve-request-to-register/' + requestToRegisterBefore.id);
        expect(request.request.method).toBe('PUT');
        request.flush(requestToRegisterAfter);
    });

    it('reject() should reject request to register', () => {
        const requestToRegisterBefore = new RequestToRegister('Petar', 'Petrovic', 'petar.petrovic@somemail.com', 'AWAITING_APPROVAL', 1);
        const reason = 'Some reason';

        service.reject(requestToRegisterBefore.id, reason).subscribe((res) => {
            expect(res).toEqual({ msg: 'no content' });
        });

        const request = httpMock.expectOne(url + '/reject-request-to-register/' + requestToRegisterBefore.id);
        expect(request.request.method).toBe('PUT');
        request.flush({ msg: 'no content' });
    });
});