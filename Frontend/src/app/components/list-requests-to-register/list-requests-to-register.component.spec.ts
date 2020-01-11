import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { RequestToRegister } from './../../models/request-to-register';
import 'hammerjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemoMaterialModule } from './../../material-module';
import { ListRequestsToRegisterComponent } from './list-requests-to-register.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material';

class MatDialogStub {
    open(component, data) {
    }
}

describe('ListRequestsToRegisterComponent', () => {
    let component: ListRequestsToRegisterComponent;
    let fixture: ComponentFixture<ListRequestsToRegisterComponent>;
    let requests: RequestToRegister[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                DemoMaterialModule
            ],
            declarations: [ListRequestsToRegisterComponent],
            providers: [
                { provide: MatDialog, useClass: MatDialogStub }
            ]
        });

        fixture = TestBed.createComponent(ListRequestsToRegisterComponent);
        component = fixture.componentInstance;

        requests = [
            new RequestToRegister('Petar', 'Petrovic', 'petar.petrovic@somemail.com', 'AWAITING_APPROVAL', 1)
        ];
        component.requestToRegisterDataSource = new MatTableDataSource(requests);
        fixture.detectChanges();
    });

    it('should open approve request dialog when clicked on approve button', () => {
        let dialog = TestBed.get(MatDialog);
        let spy = spyOn(dialog, 'open');

        const de = fixture.debugElement.query(By.css('table'));
        const el = de.nativeElement;
        const button = el.querySelectorAll('button')[0];

        button.click();

        expect(spy).toHaveBeenCalled();
    });

    it('should open reject request dialog when clicked on reject button', () => {
        let dialog = TestBed.get(MatDialog);
        let spy = spyOn(dialog, 'open');

        const de = fixture.debugElement.query(By.css('table'));
        const el = de.nativeElement;
        const button = el.querySelectorAll('button')[1];

        button.click();

        expect(spy).toHaveBeenCalled();
    });
});
