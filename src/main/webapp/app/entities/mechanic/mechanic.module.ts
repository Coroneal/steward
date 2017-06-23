import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StewardSharedModule } from '../../shared';
import { StewardAdminModule } from '../../admin/admin.module';
import {
    MechanicService,
    MechanicPopupService,
    MechanicComponent,
    MechanicDetailComponent,
    MechanicDialogComponent,
    MechanicPopupComponent,
    MechanicDeletePopupComponent,
    MechanicDeleteDialogComponent,
    mechanicRoute,
    mechanicPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mechanicRoute,
    ...mechanicPopupRoute,
];

@NgModule({
    imports: [
        StewardSharedModule,
        StewardAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MechanicComponent,
        MechanicDetailComponent,
        MechanicDialogComponent,
        MechanicDeleteDialogComponent,
        MechanicPopupComponent,
        MechanicDeletePopupComponent,
    ],
    entryComponents: [
        MechanicComponent,
        MechanicDialogComponent,
        MechanicPopupComponent,
        MechanicDeleteDialogComponent,
        MechanicDeletePopupComponent,
    ],
    providers: [
        MechanicService,
        MechanicPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StewardMechanicModule {}
