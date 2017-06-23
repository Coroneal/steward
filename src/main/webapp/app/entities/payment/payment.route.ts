import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PaymentComponent } from './payment.component';
import { PaymentDetailComponent } from './payment-detail.component';
import { PaymentPopupComponent } from './payment-dialog.component';
import { PaymentDeletePopupComponent } from './payment-delete-dialog.component';

import { Principal } from '../../shared';

export const paymentRoute: Routes = [
  {
    path: 'payment',
    component: PaymentComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'payment/:id',
    component: PaymentDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paymentPopupRoute: Routes = [
  {
    path: 'payment-new',
    component: PaymentPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'payment/:id/edit',
    component: PaymentPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'payment/:id/delete',
    component: PaymentDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
