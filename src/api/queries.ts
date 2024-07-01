import { useQuery } from '@tanstack/react-query';
import { User } from 'node-telegram-bot-api';

import { BotInfo } from '@/interfaces/BotInfo';
import { Community } from '@/interfaces/Community';
import { CommunityInfo } from '@/interfaces/CommunityInfo';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { HistoryItem } from '@/interfaces/HistoryItem';
import { LinkOwner } from '@/interfaces/LinkOwner';
import { Reward } from '@/interfaces/Reward';
import { Triggers } from '@/interfaces/Triggers';
import { apiClient } from './apiClient';

export function useCurrentUser() {
  return useQuery({
    queryKey: [],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/referrals/currentUser', {
          signal,
          params: {
            header: { tmaInitData: '' }
          }
        })
      ).data as unknown as User
  });
}

export function useStartParam(startParam?: string) {
  return useQuery({
    queryKey: [startParam],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/referrals/startParam', {
          signal,
          params: {
            header: {
              startParam: startParam!
            }
          }
        })
      ).data as unknown as LinkOwner | CommunityInfo,
    enabled: !!startParam
  });
}

export function useCommunity(id?: string) {
  return useQuery({
    queryKey: ['community', id],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/community/{chatId}', {
          signal,
          params: {
            path: { chatId: Number(id) },
            header: { tmaInitData: '' }
          }
        })
      ).data as unknown as Community,
    enabled: !!id
  });
}

export function useUserCommunity(id?: string) {
  return useQuery({
    queryKey: ['communities', id],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/community/{chatId}/user', {
          signal,
          params: {
            path: { chatId: Number(id) },
            header: { tmaInitData: '' }
          }
        })
      ).data as unknown as CommunityUser,

    enabled: !!id
  });
}

export function useUserCommunities() {
  return useQuery({
    queryKey: ['userCommunities'],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/community/user', {
          signal,
          params: {
            header: { tmaInitData: '' }
          }
        })
      ).data as unknown as CommunityUser[],
    initialData: []
  });
}

export function useAdminCommunities() {
  return useQuery({
    queryKey: ['adminCommunities'],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/community/admin-user', {
          signal,
          params: {
            header: { tmaInitData: '' }
          }
        })
      ).data as unknown as CommunityUser[],
    initialData: []
  });
}

// TODO: pagination
export function useUserHistory(chatId?: number | string) {
  return useQuery({
    queryKey: ['userHistory', chatId],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/history/chat/{chatId}', {
          signal,
          params: {
            header: { tmaInitData: '' },
            query: { limit: 10 },
            path: { chatId: Number(chatId) }
          }
        })
      ).data as unknown as HistoryItem[],
    enabled: !!chatId,
    initialData: []
  });
}

export function useTriggersByChatId(chatId?: number | string) {
  return useQuery({
    queryKey: ['TriggersByChatId', chatId],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/triggers/community/{chatId}', {
          signal,
          params: { header: { tmaInitData: '' }, path: { chatId: Number(chatId) } }
        })
      ).data as unknown as Triggers,
    enabled: !!chatId
  });
}

// TODO: pagination
export function useRewardsByChatId(chatId?: number | string, page: number = 0, size: number = 10) {
  return useQuery({
    queryKey: ['rewardsByChatId', chatId],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/backend/reward/chat/{chatId}', {
          signal,
          params: {
            header: { tmaInitData: '' },
            path: { chatId: Number(chatId) },
            query: {
              page,
              size
            }
          }
        })
      ).data as unknown as Reward[],
    enabled: !!chatId
  });
}

export function useBotInfo() {
  return useQuery({
    queryKey: ['botInfo'],
    queryFn: async ({ signal }) => {
      const result = await apiClient.GET('/backend/telegram/botInfo', { signal });

      return result.data as unknown as BotInfo;
    }
  });
}
