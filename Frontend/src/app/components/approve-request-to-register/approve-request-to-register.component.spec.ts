import { ApproveRequestToRegisterComponent } from './approve-request-to-register.component';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestToRegister } from './../../models/request-to-register';
import 'hammerjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemoMaterialModule } from './../../material-module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

class MatDialogRefStub {
    close() {
    }
}

describe('ApproveRequestToRegisterComponent', () => {
    let component: ApproveRequestToRegisterComponent;
    let fixture: ComponentFixture<ApproveRequestToRegisterComponent>;

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
            declarations: [ApproveRequestToRegisterComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, MatDialogRefStub }
            ]
        });

        fixture = TestBed.createComponent(ApproveRequestToRegisterComponent);
        component = fixture.componentInstance;

        const data = {
            requsetToRegister: new RequestToRegister('Petar', 'Petrovic', 'petar.petrovic@somemail.com', 'AWAITING_APPROVAL', 1)
        }

        component.data = data;
        fixture.detectChanges();
    });

    it('should call approve() when clicked on confirm button', () => {
        let spy = spyOn(component, 'approve');

        const de = fixture.debugElement.query(By.css('.mt-2'));
        const el = de.nativeElement;
        const button = el.querySelectorAll('button')[0];
        button.click();

        expect(spy).toHaveBeenCalled();
    });
});
