import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StewardSharedModule } from '../../shared';
import { StewardAdminModule } from '../../admin/admin.module';
import {
    BuyerService,
    BuyerPopupService,
    BuyerComponent,
    BuyerDetailComponent,
    BuyerDialogComponent,
    BuyerPopupComponent,
    BuyerDeletePopupComponent,
    BuyerDeleteDialogComponent,
    buyerRoute,
    buyerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...buyerRoute,
    ...buyerPopupRoute,
];

@NgModule({
    imports: [
        StewardSharedModule,
        StewardAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BuyerComponent,
        BuyerDetailComponent,
        BuyerDialogComponent,
        BuyerDeleteDialogComponent,
        BuyerPopupComponent,
        BuyerDeletePopupComponent,
    ],
    entryComponents: [
        BuyerComponent,
        BuyerDialogComponent,
        BuyerPopupComponent,
        BuyerDeleteDialogComponent,
        BuyerDeletePopupComponent,
    ],
    providers: [
        BuyerService,
        BuyerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StewardBuyerModule {}
