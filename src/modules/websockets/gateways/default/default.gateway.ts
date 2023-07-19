import { Server } from 'socket.io'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Gateway } from '../../interfaces/gw.interface'

@WebSocketGateway({ cors: '*' })
export class DefaultGateway implements Gateway {
    @WebSocketServer()
    private readonly server: Server

    emitBroadcast(event: string, data: any) {
        this.server.emit(event, data)
    }

    emitToRoom(room: string, event: string, data: any): void {
        this.server.to(room).emit(event, data)
    }
}
