export interface CommunityUser {
  userId: number;
  chatId: number;
  communityName: string;
  points: number;
  isAdmin: boolean;
  photoLink?: string;
  settings?: {
    isTonConnectWallet: boolean;
  };
}
