export interface Community {
  chatId: number;
  title: string;
  userIds: string[];
  threshold: number;
  remainingPoints: number;
  walletAddress: string;
}