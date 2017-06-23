import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { StewardTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OpinionDetailComponent } from '../../../../../../main/webapp/app/entities/opinion/opinion-detail.component';
import { OpinionService } from '../../../../../../main/webapp/app/entities/opinion/opinion.service';
import { Opinion } from '../../../../../../main/webapp/app/entities/opinion/opinion.model';

describe('Component Tests', () => {

    describe('Opinion Management Detail Component', () => {
        let comp: OpinionDetailComponent;
        let fixture: ComponentFixture<OpinionDetailComponent>;
        let service: OpinionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StewardTestModule],
                declarations: [OpinionDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OpinionService,
                    EventManager
                ]
            }).overrideComponent(OpinionDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpinionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpinionService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Opinion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.opinion).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
