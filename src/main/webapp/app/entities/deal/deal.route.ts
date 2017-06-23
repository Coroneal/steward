import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DealComponent } from './deal.component';
import { DealDetailComponent } from './deal-detail.component';
import { DealPopupComponent } from './deal-dialog.component';
import { DealDeletePopupComponent } from './deal-delete-dialog.component';

import { Principal } from '../../shared';

export const dealRoute: Routes = [
  {
    path: 'deal',
    component: DealComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.deal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'deal/:id',
    component: DealDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.deal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dealPopupRoute: Routes = [
  {
    path: 'deal-new',
    component: DealPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.deal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'deal/:id/edit',
    component: DealPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.deal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'deal/:id/delete',
    component: DealDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.deal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
