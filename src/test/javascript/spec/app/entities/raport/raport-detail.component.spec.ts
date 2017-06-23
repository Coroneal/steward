import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { StewardTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RaportDetailComponent } from '../../../../../../main/webapp/app/entities/raport/raport-detail.component';
import { RaportService } from '../../../../../../main/webapp/app/entities/raport/raport.service';
import { Raport } from '../../../../../../main/webapp/app/entities/raport/raport.model';

describe('Component Tests', () => {

    describe('Raport Management Detail Component', () => {
        let comp: RaportDetailComponent;
        let fixture: ComponentFixture<RaportDetailComponent>;
        let service: RaportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StewardTestModule],
                declarations: [RaportDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RaportService,
                    EventManager
                ]
            }).overrideComponent(RaportDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RaportDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaportService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Raport(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.raport).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
