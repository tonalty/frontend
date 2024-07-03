import { TriggerType } from '@/enums/TriggerType';
import { ReactionIcon } from '@/icons/ReactionIcon';
import { ReferralIcon } from '@/icons/ReferralIcon';

export const getIcon = (type: string, isInvertedColor: boolean = false, src?: string) => {
  if (type === TriggerType.messageReaction) {
    return <ReactionIcon isInvertedColor={isInvertedColor} />;
  } else if (type === TriggerType.referralJoin) {
    return <ReferralIcon isInvertedColor={isInvertedColor} />;
  } else if (type === TriggerType.rewardBuy) {
    return <img style={{ borderRadius: 100 }} src={src} width={48} height={48}></img>;
  }
};

export const formatPoints = (points: number) => {
  if (points.toString()[0] === '-') {
    return `${points.toFixed(2)}`;
  }

  const sign = points > 0 ? '+' : '-';

  return `${sign}${points.toFixed(2)}`;
};
