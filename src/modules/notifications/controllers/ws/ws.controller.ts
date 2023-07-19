import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { Comment } from '../../models/comment.model'
import { CommentsService } from '../../services/ws/comments/comments.service'

@Controller('ws')
export class WsController {
    constructor(private readonly commentsService: CommentsService) {}

    @EventPattern('notifications:ws:comment')
    async newComment(@Payload() comment: Comment) {
        this.commentsService.propagateComment(comment)
    }
}
