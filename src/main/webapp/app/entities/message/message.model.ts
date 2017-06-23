import { Mechanic } from '../mechanic';
import { Buyer } from '../buyer';
export class Message {
    constructor(
        public id?: number,
        public mechanic?: Mechanic,
        public buyer?: Buyer,
    ) {
    }
}
