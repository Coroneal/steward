import { User } from '../../shared';
import { Opinion } from '../opinion';
import { Message } from '../message';
import { Deal } from '../deal';
export class Mechanic {
    constructor(
        public id?: number,
        public user?: User,
        public opinion?: Opinion,
        public message?: Message,
        public deal?: Deal,
    ) {
    }
}
