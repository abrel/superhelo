import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isAIMessage } from '@langchain/core/messages';
import GuardianChatBot from '@@/services/gpt/mistral/chat';
import * as MessageRepository from '@@/services/mongo/repositories/Message';
import { MessageTypes } from '@@/constants/message';

export const handleQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const conversationId = req.body.conversationId || uuidv4();
    const response = await GuardianChatBot.askQuestion({
      question: req.body.question,
      threadId: conversationId,
    });

    for (const message of response.messages) {
      if (message.id && message.content) {
        await MessageRepository.findOrCreateMessage({
          conversationId,
          messageId: message.id,
          content: String(message.content),
          type: isAIMessage(message) ? MessageTypes.AI : MessageTypes.HUMAN,
        });
      }
    }

    return res.json(
      await MessageRepository.findAllMessagesBy({ conversationId }),
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
