import { HistoryType } from '@/enums/HistoryType';

export interface HistoryItem {
  communityId: number;
  data: {
    messageId: string;
    chatId: number;
    type: HistoryType;
  };
  createdAt: string;
}
