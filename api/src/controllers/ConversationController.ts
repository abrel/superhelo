import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isAIMessage } from '@langchain/core/messages';
import MistralGuardianChatBot from '@@/services/gpt/mistral/chat';
import * as MessageRepository from '@@/services/mongo/repositories/Message';
import { MessageTypes } from '@@/constants/message';

export const setConversationId = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.sh.conversationId = req.body.conversationId || uuidv4();
  return next();
};

export const handleQuestion = async (
  req: Request & {
    files?: Express.Multer.File[];
  },
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await MistralGuardianChatBot.askQuestion({
      question: req.body.question,
      wardId: req.body.wardId,
      threadId: req.sh.conversationId!,
      files: req.files,
    });

    for (const message of response.messages) {
      if (message.id && typeof message.content === 'string') {
        const isFromAI = isAIMessage(message);

        await MessageRepository.findOrCreateMessage({
          conversationId: req.sh.conversationId!,
          userId: req.body.wardId,
          messageId: message.id,
          content: message.content,
          type: isFromAI ? MessageTypes.AI : MessageTypes.HUMAN,
          documentIds: isFromAI
            ? undefined
            : req.sh.documents?.map((doc) => doc.id),
        });
      }
    }

    return res.json(
      await MessageRepository.findAllMessagesBy({
        conversationId: req.sh.conversationId!,
      }),
    );
  } catch (error) {
    return next(error);
  }
};

export const retrieveConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.params.conversationId) {
      return res.json([]);
    }

    return res.json(
      await MessageRepository.findAllMessagesBy({
        conversationId: req.params.conversationId,
      }),
    );
  } catch (error) {
    return next(error);
  }
};
