import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { BuyerComponent } from './buyer.component';
import { BuyerDetailComponent } from './buyer-detail.component';
import { BuyerPopupComponent } from './buyer-dialog.component';
import { BuyerDeletePopupComponent } from './buyer-delete-dialog.component';

import { Principal } from '../../shared';

export const buyerRoute: Routes = [
  {
    path: 'buyer',
    component: BuyerComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.buyer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'buyer/:id',
    component: BuyerDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.buyer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const buyerPopupRoute: Routes = [
  {
    path: 'buyer-new',
    component: BuyerPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.buyer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'buyer/:id/edit',
    component: BuyerPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.buyer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'buyer/:id/delete',
    component: BuyerDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.buyer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
