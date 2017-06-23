import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Buyer } from './buyer.model';
import { BuyerService } from './buyer.service';

@Component({
    selector: 'jhi-buyer-detail',
    templateUrl: './buyer-detail.component.html'
})
export class BuyerDetailComponent implements OnInit, OnDestroy {

    buyer: Buyer;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private buyerService: BuyerService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['buyer']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBuyers();
    }

    load(id) {
        this.buyerService.find(id).subscribe((buyer) => {
            this.buyer = buyer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBuyers() {
        this.eventSubscriber = this.eventManager.subscribe('buyerListModification', (response) => this.load(this.buyer.id));
    }
}
