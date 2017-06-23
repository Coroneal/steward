import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { StewardTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BuyerDetailComponent } from '../../../../../../main/webapp/app/entities/buyer/buyer-detail.component';
import { BuyerService } from '../../../../../../main/webapp/app/entities/buyer/buyer.service';
import { Buyer } from '../../../../../../main/webapp/app/entities/buyer/buyer.model';

describe('Component Tests', () => {

    describe('Buyer Management Detail Component', () => {
        let comp: BuyerDetailComponent;
        let fixture: ComponentFixture<BuyerDetailComponent>;
        let service: BuyerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StewardTestModule],
                declarations: [BuyerDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BuyerService,
                    EventManager
                ]
            }).overrideComponent(BuyerDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BuyerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuyerService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Buyer(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.buyer).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
