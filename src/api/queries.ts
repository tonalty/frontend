import { useQuery } from '@tanstack/react-query';
import { User } from 'node-telegram-bot-api';

import { CommunityUser } from '@/interfaces/CommunityUser';
import { HistoryItem } from '@/interfaces/HistoryItem';
import { LinkOwner } from '@/interfaces/LinkOwner';
import { Reward } from '@/interfaces/Reward';
import { Triggers } from '@/interfaces/Triggers';
import { apiClient } from './apiClient';
import { CommunityInfo } from '@/interfaces/CommunityInfo';

export function useCurrentUser() {
  return useQuery({
    queryKey: [],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/referrals/currentUser', {
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
        await apiClient.GET('/referrals/startParam', {
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

export function useUserCommunity(id?: string) {
  return useQuery({
    queryKey: ['communities', id],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/communities/{id}', {
          signal,
          params: {
            path: { id: Number(id) },
            header: { tmaInitData: '' }
          }
        })
      ).data as unknown as CommunityUser,

    enabled: !!id
  });
}

export function useAllCommunities() {
  return useQuery({
    queryKey: ['allCommunities'],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/communities/all', {
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
        await apiClient.GET('/communities/admin', {
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
export function useUserHistory(chatId: number) {
  return useQuery({
    queryKey: ['userHistory'],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/history/chat/{chatId}', {
          signal,
          params: {
            header: { tmaInitData: '' },
            query: { limit: 10 },
            path: { chatId }
          }
        })
      ).data as unknown as HistoryItem[],
    initialData: []
  });
}

export function useTriggersByChatId(chatId?: number | string) {
  return useQuery({
    queryKey: ['TriggersByChatId', chatId],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/triggers/community/{chatId}', {
          signal,
          params: { header: { tmaInitData: '' }, path: { chatId: Number(chatId) } }
        })
      ).data as unknown as Triggers,
    enabled: !!chatId,
    initialData: null
  });
}

// TODO: pagination
export function useRewardsByChatId(chatId?: number | string, page: number = 0, size: number = 10) {
  return useQuery({
    queryKey: ['rewardsByChatId', chatId],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/reward/chat/{chatId}', {
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
