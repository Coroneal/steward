import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MechanicComponent } from './mechanic.component';
import { MechanicDetailComponent } from './mechanic-detail.component';
import { MechanicPopupComponent } from './mechanic-dialog.component';
import { MechanicDeletePopupComponent } from './mechanic-delete-dialog.component';

import { Principal } from '../../shared';

export const mechanicRoute: Routes = [
  {
    path: 'mechanic',
    component: MechanicComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.mechanic.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'mechanic/:id',
    component: MechanicDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.mechanic.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mechanicPopupRoute: Routes = [
  {
    path: 'mechanic-new',
    component: MechanicPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.mechanic.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'mechanic/:id/edit',
    component: MechanicPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.mechanic.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'mechanic/:id/delete',
    component: MechanicDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.mechanic.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
