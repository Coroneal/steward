import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StewardSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';

@NgModule({
    imports: [
        StewardSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        BrowserAnimationsModule,
        MaterialModule,
        MdButtonModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StewardHomeModule {}
