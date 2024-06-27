interface ReactionTrigger {
  points: number;
  threshold: number;
  isEnabled: boolean;
}

interface ReferralTrigger {
  inviterPoints: number;
  inviteePoints: number;
  isEnabled: boolean;
}

export interface Triggers {
  referral: ReferralTrigger;
  reaction: ReactionTrigger;
}
