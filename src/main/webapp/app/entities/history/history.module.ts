import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StewardSharedModule } from '../../shared';
import {
    HistoryService,
    HistoryPopupService,
    HistoryComponent,
    HistoryDetailComponent,
    HistoryDialogComponent,
    HistoryPopupComponent,
    HistoryDeletePopupComponent,
    HistoryDeleteDialogComponent,
    historyRoute,
    historyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...historyRoute,
    ...historyPopupRoute,
];

@NgModule({
    imports: [
        StewardSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HistoryComponent,
        HistoryDetailComponent,
        HistoryDialogComponent,
        HistoryDeleteDialogComponent,
        HistoryPopupComponent,
        HistoryDeletePopupComponent,
    ],
    entryComponents: [
        HistoryComponent,
        HistoryDialogComponent,
        HistoryPopupComponent,
        HistoryDeleteDialogComponent,
        HistoryDeletePopupComponent,
    ],
    providers: [
        HistoryService,
        HistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StewardHistoryModule {}
