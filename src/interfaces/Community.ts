import { Triggers } from './Triggers';

export interface Community {
  [key: string]: string | number | string[] | Triggers | undefined;
  chatId: number;
  title: string;
  adminUserIds: string[];
  walletAddress: string;
  triggers: Triggers;
  members?: number;
  comments?: number;
  reactions?: number;
}
