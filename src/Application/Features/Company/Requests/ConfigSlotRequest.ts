interface Slot {
    [state: string]: number;
}

export class ConfigSlotRequest {
    slotTime: number;
    slot: Slot;
}