import { HistoryType } from '@/enums/HistoryType';
import { ReactionIcon } from '@/icons/ReactionIcon';
import { ReferralIcon } from '@/icons/ReferralIcon';

export const getIcon = (type: string) => {
  if (type === HistoryType.messageReaction) {
    return <ReactionIcon />;
  } else if (type === HistoryType.refferalJoin) {
    return <ReferralIcon />;
  }
};
