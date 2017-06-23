import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RaportComponent } from './raport.component';
import { RaportDetailComponent } from './raport-detail.component';
import { RaportPopupComponent } from './raport-dialog.component';
import { RaportDeletePopupComponent } from './raport-delete-dialog.component';

import { Principal } from '../../shared';

export const raportRoute: Routes = [
  {
    path: 'raport',
    component: RaportComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.raport.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'raport/:id',
    component: RaportDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.raport.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const raportPopupRoute: Routes = [
  {
    path: 'raport-new',
    component: RaportPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.raport.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'raport/:id/edit',
    component: RaportPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.raport.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'raport/:id/delete',
    component: RaportDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.raport.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
