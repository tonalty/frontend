import { TriggerType } from '@/enums/TriggerType';

type DataReward = {
  rewardDescription: string;
  rewardImageUrl: string;
  rewardMessage: string;
  rewardTitle: string;
  rewardValue: number;
  rewardDecreasedPoints: number;
  type: TriggerType.rewardBuy;
};

type DataReactionReferralLink = {
  messageId: string;
  chatId: number;
  type: TriggerType.messageReaction | TriggerType.referralJoin;
  points: number;
  username?: string;
  isOwner: boolean;
};

export interface HistoryItem {
  communityId?: number;
  data: DataReward | DataReactionReferralLink;
  createdAt: string;
}
