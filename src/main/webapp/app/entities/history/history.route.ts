import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { HistoryComponent } from './history.component';
import { HistoryDetailComponent } from './history-detail.component';
import { HistoryPopupComponent } from './history-dialog.component';
import { HistoryDeletePopupComponent } from './history-delete-dialog.component';

import { Principal } from '../../shared';

export const historyRoute: Routes = [
  {
    path: 'history',
    component: HistoryComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.history.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'history/:id',
    component: HistoryDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.history.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const historyPopupRoute: Routes = [
  {
    path: 'history-new',
    component: HistoryPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.history.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'history/:id/edit',
    component: HistoryPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.history.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'history/:id/delete',
    component: HistoryDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.history.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
