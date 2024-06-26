import { TriggerType } from '@/enums/TriggerType';
import { ReactionIcon } from '@/icons/ReactionIcon';
import { ReferralIcon } from '@/icons/ReferralIcon';

export const getIcon = (type: string, isInvertedColor: boolean = false) => {
  if (type === TriggerType.messageReaction) {
    return <ReactionIcon isInvertedColor={isInvertedColor} />;
  } else if (type === TriggerType.referralJoin) {
    return <ReferralIcon isInvertedColor={isInvertedColor} />;
  }
};

export const formatPoints = (points: number) => {
  const sign = points > 0 ? '+' : '-';

  return `${sign}${points.toFixed(2)}`;
};
