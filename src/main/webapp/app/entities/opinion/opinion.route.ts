import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { OpinionComponent } from './opinion.component';
import { OpinionDetailComponent } from './opinion-detail.component';
import { OpinionPopupComponent } from './opinion-dialog.component';
import { OpinionDeletePopupComponent } from './opinion-delete-dialog.component';

import { Principal } from '../../shared';

export const opinionRoute: Routes = [
  {
    path: 'opinion',
    component: OpinionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.opinion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'opinion/:id',
    component: OpinionDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.opinion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const opinionPopupRoute: Routes = [
  {
    path: 'opinion-new',
    component: OpinionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.opinion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'opinion/:id/edit',
    component: OpinionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.opinion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'opinion/:id/delete',
    component: OpinionDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'stewardApp.opinion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
