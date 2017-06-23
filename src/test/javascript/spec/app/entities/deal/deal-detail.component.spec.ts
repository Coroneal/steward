import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { StewardTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DealDetailComponent } from '../../../../../../main/webapp/app/entities/deal/deal-detail.component';
import { DealService } from '../../../../../../main/webapp/app/entities/deal/deal.service';
import { Deal } from '../../../../../../main/webapp/app/entities/deal/deal.model';

describe('Component Tests', () => {

    describe('Deal Management Detail Component', () => {
        let comp: DealDetailComponent;
        let fixture: ComponentFixture<DealDetailComponent>;
        let service: DealService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StewardTestModule],
                declarations: [DealDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DealService,
                    EventManager
                ]
            }).overrideComponent(DealDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DealDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DealService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Deal(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.deal).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
