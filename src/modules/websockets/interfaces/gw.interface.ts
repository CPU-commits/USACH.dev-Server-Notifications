export interface Gateway {
    emitBroadcast(event: string, data: any): void
    emitToRoom(room: string, event: string, data: any): void
}
