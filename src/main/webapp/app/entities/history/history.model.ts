
const enum EventType {
    'DEAL',
    'ACCEPT_DEAL',
    'PAYMENT'

};

const enum EventEntity {
    'MECHANIC',
    'BUYER'

};
export class History {
    constructor(
        public id?: number,
        public date?: any,
        public eventType?: EventType,
        public eventEntity?: EventEntity,
        public description?: string,
    ) {
    }
}
