import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RejectRequestToRegisterComponent } from './reject-request-to-register.component';
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

describe('RejectRequestToRegisterComponent', () => {
    let component: RejectRequestToRegisterComponent;
    let fixture: ComponentFixture<RejectRequestToRegisterComponent>;

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
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ],
            declarations: [RejectRequestToRegisterComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, MatDialogRefStub }
            ]
        });

        fixture = TestBed.createComponent(RejectRequestToRegisterComponent);
        component = fixture.componentInstance;

        const data = {
            requsetToRegister: new RequestToRegister('Petar', 'Petrovic', 'petar.petrovic@somemail.com', 'AWAITING_APPROVAL', 1)
        }

        component.data = data;
        fixture.detectChanges();
    });

    it('should call reject() when clicked on confirm button', () => {
        component.ngOnInit();
        component.rejectRequestToRegisterForm.patchValue(
            { 'reason': 'Some reason' }
        );
        fixture.detectChanges();

        let spy = spyOn(component, 'reject');

        const de = fixture.debugElement.query(By.css('.mt-3'));
        const el = de.nativeElement;
        const button = el.querySelector('button');
        button.click();

        expect(spy).toHaveBeenCalled();
    });

    it('should NOT call reject() when clicked on confirm button', () => {
        let spy = spyOn(component, 'reject');

        const de = fixture.debugElement.query(By.css('.mt-3'));
        const el = de.nativeElement;
        const button = el.querySelector('button');
        button.click();

        expect(spy).not.toHaveBeenCalled();
    });
});
