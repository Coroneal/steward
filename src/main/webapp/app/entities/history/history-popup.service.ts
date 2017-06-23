import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { History } from './history.model';
import { HistoryService } from './history.service';
@Injectable()
export class HistoryPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private historyService: HistoryService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.historyService.find(id).subscribe((history) => {
                if (history.date) {
                    history.date = {
                        year: history.date.getFullYear(),
                        month: history.date.getMonth() + 1,
                        day: history.date.getDate()
                    };
                }
                this.historyModalRef(component, history);
            });
        } else {
            return this.historyModalRef(component, new History());
        }
    }

    historyModalRef(component: Component, history: History): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.history = history;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
