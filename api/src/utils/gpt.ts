import { BaseMessage, trimMessages } from '@langchain/core/messages';
const MAX_TOKENS = 150000;

const tokenCounter = (msg: BaseMessage): number => {
  let text: string;
  if (typeof msg.content === 'string') {
    text = msg.content;
  } else if (Array.isArray(msg.content)) {
    text = msg.content
      .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
      .join(' ');
  } else {
    text = JSON.stringify(msg.content);
  }

  return text.length / 4;
};

export const filterOldLargeMessages = (
  msgs: BaseMessage[],
  preserveCount: number = 5,
): BaseMessage[] => {
  return msgs.filter((msg, idx) => {
    if (idx >= msgs.length - preserveCount) {
      return true;
    }

    return tokenCounter(msg) < MAX_TOKENS / 5;
  });
};

const customTokenCounter = (msgs: BaseMessage[]): number => {
  let totalTokens = 0;

  for (const msg of msgs) {
    totalTokens += tokenCounter(msg);
  }

  return totalTokens;
};

export const trimmer = trimMessages({
  maxTokens: MAX_TOKENS,
  strategy: 'last',
  tokenCounter: customTokenCounter,
  includeSystem: true,
  allowPartial: true,
});
