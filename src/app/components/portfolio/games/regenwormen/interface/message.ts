export interface Message {
    type: string;
    receiver: string;
    message: string;
    timer: number | "none";
    active: boolean;
}
