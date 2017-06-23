import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StewardSharedModule } from '../../shared';
import {
    RaportService,
    RaportPopupService,
    RaportComponent,
    RaportDetailComponent,
    RaportDialogComponent,
    RaportPopupComponent,
    RaportDeletePopupComponent,
    RaportDeleteDialogComponent,
    raportRoute,
    raportPopupRoute,
} from './';

const ENTITY_STATES = [
    ...raportRoute,
    ...raportPopupRoute,
];

@NgModule({
    imports: [
        StewardSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RaportComponent,
        RaportDetailComponent,
        RaportDialogComponent,
        RaportDeleteDialogComponent,
        RaportPopupComponent,
        RaportDeletePopupComponent,
    ],
    entryComponents: [
        RaportComponent,
        RaportDialogComponent,
        RaportPopupComponent,
        RaportDeleteDialogComponent,
        RaportDeletePopupComponent,
    ],
    providers: [
        RaportService,
        RaportPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StewardRaportModule {}
