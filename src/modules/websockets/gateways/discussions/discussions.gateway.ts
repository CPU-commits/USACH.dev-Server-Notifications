import { Server, Socket } from 'socket.io'
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { Gateway } from '../../interfaces/gw.interface'

@WebSocketGateway({
    cors: {
        allowedHeaders: ['x-discussion'],
        credentials: true,
        origin: '*',
    },
    namespace: 'discussions',
})
export class DiscussionsGateway
    implements OnGatewayConnection, OnGatewayDisconnect, Gateway
{
    private clients = new Map<string, string>()

    @WebSocketServer()
    private readonly server: Server

    constructor(private readonly httpService: HttpService) {}

    async handleConnection(client: Socket) {
        const idDiscussion = client.request.headers['x-discussion']
        const token = client.request.headers.authorization
        console.log(idDiscussion, token)
        if (!idDiscussion || !token)
            throw new WsException('x-discussion or authorization missing')
        // Has access to discussion
        try {
            await lastValueFrom(
                this.httpService.get(
                    `/api/v1/discussion/${idDiscussion}/has_access`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                ),
            )
        } catch (err) {
            throw new WsException(err)
        }
        // Add client
        const user = JSON.parse(
            Buffer.from(
                token.replace('Bearer ', '').split('.')[1],
                'base64',
            ).toString(),
        )

        client.join(idDiscussion)
        this.clients.set(client.id, user._id)
    }

    handleDisconnect(client: Socket) {
        this.clients.delete(client.id)
    }

    emitBroadcast(event: string, data: any) {
        this.server.emit(event, data)
    }

    emitToRoom(room: string, event: string, data: any) {
        this.server.to(room).emit(event, data)
    }
}
