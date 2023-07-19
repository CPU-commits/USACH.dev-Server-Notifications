import { Global, Module } from '@nestjs/common'
import { DefaultGateway } from './gateways/default/default.gateway'
import { WsService } from './services/ws/ws.service'
import { DiscussionsGateway } from './gateways/discussions/discussions.gateway'
import { HttpModule } from '@nestjs/axios'
import config from 'src/config'
import { ConfigType } from '@nestjs/config'

@Global()
@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory(configService: ConfigType<typeof config>) {
                return {
                    baseURL: configService.http,
                }
            },
            inject: [config.KEY],
        }),
    ],
    providers: [DefaultGateway, WsService, DiscussionsGateway],
    exports: [WsService],
})
export class WebsocketsModule {}
