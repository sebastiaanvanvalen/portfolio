import { User } from './user';

export interface ServerObject {
    responseDestination: string;
    permission: boolean;
    payload: Object;
    message: string;
    createdAt: string;
}
