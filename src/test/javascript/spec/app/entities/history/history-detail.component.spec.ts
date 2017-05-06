import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { StewardTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HistoryDetailComponent } from '../../../../../../main/webapp/app/entities/history/history-detail.component';
import { HistoryService } from '../../../../../../main/webapp/app/entities/history/history.service';
import { History } from '../../../../../../main/webapp/app/entities/history/history.model';

describe('Component Tests', () => {

    describe('History Management Detail Component', () => {
        let comp: HistoryDetailComponent;
        let fixture: ComponentFixture<HistoryDetailComponent>;
        let service: HistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StewardTestModule],
                declarations: [HistoryDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HistoryService,
                    EventManager
                ]
            }).overrideComponent(HistoryDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new History(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.history).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
