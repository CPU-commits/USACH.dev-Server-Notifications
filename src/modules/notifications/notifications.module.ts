import { Module } from '@nestjs/common'
import { WsController } from './controllers/ws/ws.controller'
import { CommentsService } from './services/ws/comments/comments.service'

@Module({
    controllers: [WsController],
    providers: [CommentsService],
})
export class NotificationsModule {}
