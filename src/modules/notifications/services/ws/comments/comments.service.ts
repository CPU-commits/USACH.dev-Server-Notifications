import { Injectable } from '@nestjs/common'
import { Comment } from 'src/modules/notifications/models/comment.model'
import { WsService } from 'src/modules/websockets/services/ws/ws.service'

@Injectable()
export class CommentsService {
    constructor(private readonly wsService: WsService) {}

    async propagateComment(comment: Comment) {
        this.wsService.toRoom({
            namespace: 'discussions',
            data: {
                ...comment,
                date: undefined,
                created_at: comment.date.toString(),
                updated_at: comment.date.toString(),
            },
            event: 'discussions:comment',
            room: comment.discussion,
        })
    }
}
