import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { WebsocketsModule } from './modules/websockets/websockets.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import * as Joi from 'joi'
import config from './config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().required(),
                REDIS_HOST: Joi.string().required(),
                REDIS_PORT: Joi.number().integer().required(),
                REDIS_PASS: Joi.string().required(),
                REDIS_USER: Joi.string().required(),
                CLIENT_DOMAIN: Joi.string().required(),
                HTTP_MS: Joi.string().required(),
            }),
        }),
        WebsocketsModule,
        NotificationsModule,
    ],
})
export class AppModule {}
