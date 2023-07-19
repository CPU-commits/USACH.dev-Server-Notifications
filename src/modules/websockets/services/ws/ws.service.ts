import { Injectable } from '@nestjs/common'
import { DefaultGateway } from '../../gateways/default/default.gateway'
import { Namespaces } from '../../models/namespaces'
import { DiscussionsGateway } from '../../gateways/discussions/discussions.gateway'
import { Gateway } from '../../interfaces/gw.interface'

@Injectable()
export class WsService {
    constructor(
        private readonly defaultGW: DefaultGateway,
        private readonly discussionsGW: DiscussionsGateway,
    ) {}

    private getGateway(namespace: keyof typeof Namespaces): Gateway {
        if (namespace === 'default') return this.defaultGW
        if (namespace === 'discussions') return this.discussionsGW
        return this.defaultGW
    }

    async broadcast(
        namespace: keyof typeof Namespaces,
        event: string,
        data: any,
    ) {
        const gateway = this.getGateway(namespace)
        // Emit
        gateway.emitBroadcast(event, data)
    }

    async toRoom({
        namespace,
        event,
        room,
        data,
    }: {
        namespace: keyof typeof Namespaces
        event: string
        room: string
        data: any
    }) {
        const gateway = this.getGateway(namespace)
        // Emit
        gateway.emitToRoom(room, event, data)
    }
}
