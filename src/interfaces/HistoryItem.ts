import { HistoryType } from '@/enums/HistoryType';

export interface HistoryItem {
  communityId: number;
  data: {
    messageId: string;
    chatId: number;
    type: HistoryType;
    points: number;
    username?: string;
  };
  createdAt: string;
}
