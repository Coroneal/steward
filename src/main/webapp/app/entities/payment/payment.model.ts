import { Deal } from '../deal';
export class Payment {
    constructor(
        public id?: number,
        public deal?: Deal,
    ) {
    }
}
