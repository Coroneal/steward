
const enum EventType {
    'DEAL',
    'ACCEPT_DEAL',
    'PAYMENT'

};

const enum EventEntity {
    'MECHANIC',
    'USER'

};
export class History {
    constructor(
        public id?: number,
        public entityId?: number,
        public date?: any,
        public eventType?: EventType,
        public eventEntity?: EventEntity,
    ) {
    }
}
