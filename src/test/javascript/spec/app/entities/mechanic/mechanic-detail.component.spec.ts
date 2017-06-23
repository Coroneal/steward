import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { StewardTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MechanicDetailComponent } from '../../../../../../main/webapp/app/entities/mechanic/mechanic-detail.component';
import { MechanicService } from '../../../../../../main/webapp/app/entities/mechanic/mechanic.service';
import { Mechanic } from '../../../../../../main/webapp/app/entities/mechanic/mechanic.model';

describe('Component Tests', () => {

    describe('Mechanic Management Detail Component', () => {
        let comp: MechanicDetailComponent;
        let fixture: ComponentFixture<MechanicDetailComponent>;
        let service: MechanicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StewardTestModule],
                declarations: [MechanicDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MechanicService,
                    EventManager
                ]
            }).overrideComponent(MechanicDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MechanicDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MechanicService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Mechanic(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mechanic).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
