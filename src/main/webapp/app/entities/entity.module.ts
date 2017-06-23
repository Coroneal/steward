import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StewardHistoryModule } from './history/history.module';
import { StewardOpinionModule } from './opinion/opinion.module';
import { StewardMessageModule } from './message/message.module';
import { StewardDealModule } from './deal/deal.module';
import { StewardPaymentModule } from './payment/payment.module';
import { StewardRaportModule } from './raport/raport.module';
import { StewardMechanicModule } from './mechanic/mechanic.module';
import { StewardBuyerModule } from './buyer/buyer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        StewardHistoryModule,
        StewardOpinionModule,
        StewardMessageModule,
        StewardDealModule,
        StewardPaymentModule,
        StewardRaportModule,
        StewardMechanicModule,
        StewardBuyerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StewardEntityModule {}
