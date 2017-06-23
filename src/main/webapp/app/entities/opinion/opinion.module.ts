import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StewardSharedModule } from '../../shared';
import {
    OpinionService,
    OpinionPopupService,
    OpinionComponent,
    OpinionDetailComponent,
    OpinionDialogComponent,
    OpinionPopupComponent,
    OpinionDeletePopupComponent,
    OpinionDeleteDialogComponent,
    opinionRoute,
    opinionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...opinionRoute,
    ...opinionPopupRoute,
];

@NgModule({
    imports: [
        StewardSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OpinionComponent,
        OpinionDetailComponent,
        OpinionDialogComponent,
        OpinionDeleteDialogComponent,
        OpinionPopupComponent,
        OpinionDeletePopupComponent,
    ],
    entryComponents: [
        OpinionComponent,
        OpinionDialogComponent,
        OpinionPopupComponent,
        OpinionDeleteDialogComponent,
        OpinionDeletePopupComponent,
    ],
    providers: [
        OpinionService,
        OpinionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StewardOpinionModule {}
