import { TriggerType } from '@/enums/TriggerType';

export interface HistoryItem {
  communityId: number;
  data: {
    messageId: string;
    chatId: number;
    type: TriggerType;
    points: number;
    username?: string;
    isOwner: boolean;
  };
  createdAt: string;
}
