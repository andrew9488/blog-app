import { inject, injectable } from "inversify";
import { Comment } from "@prisma/client";

import { TYPES } from "../shared/constants";
import { IPrismaService } from "../database/prisma.service";

type CreateCommentData = {
  content: string;
  postId: number;
};

export interface ICommentsRepository {
  createComment: (data: CreateCommentData) => Promise<Comment>;
  deleteComment: (id: number) => Promise<Comment>;
}

@injectable()
export class CommentsRepository implements ICommentsRepository {
  @inject(TYPES.PrismaService) private prismaService: IPrismaService;
  constructor() {
    this.createComment = this.createComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  createComment({ content, postId }: CreateCommentData) {
    return this.prismaService.client.comment.create({
      data: {
        content,
        postId,
      },
    });
  }

  deleteComment(id: number) {
    return this.prismaService.client.comment.delete({
      where: {
        id,
      },
    });
  }
}
