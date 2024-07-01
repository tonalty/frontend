import { Triggers } from './Triggers';

export interface Community {
  chatId: number;
  title: string;
  adminUserIds: string[];
  walletAddress: string;
  triggers: Triggers;
  members?: number;
  comments?: number;
  reactions?: number;
}
