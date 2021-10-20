import { UpdateObject } from './updateObject';

export interface Payload {
    responseDestination: string;
    permission: boolean;
    payload: UpdateObject;
    message: string;
    createdAt: string;
}

