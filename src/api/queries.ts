import { useQuery } from '@tanstack/react-query';
import { User } from 'node-telegram-bot-api';

import { CommunityUser } from '@/interfaces/CommunityUser';
import { HistoryItem } from '@/interfaces/HistoryItem';
import { LinkOwner } from '@/interfaces/LinkOwner';
import { apiClient } from './apiClient';
import { Triggers } from '@/interfaces/Triggers';

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
      ).data as unknown as LinkOwner,
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

export function useUserCommunities() {
  return useQuery({
    queryKey: ['userCommunities'],
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

export function useUserHistory() {
  return useQuery({
    queryKey: ['userHistory'],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/history/user', {
          signal,
          params: {
            header: { tmaInitData: '' },
            query: { limit: 10 }
          }
        })
      ).data as unknown as HistoryItem[],
    initialData: []
  });
}

export function useTriggers(chatId: number) {
  return useQuery({
    queryKey: ['triggers'],
    queryFn: async ({ signal }) =>
      (
        await apiClient.GET('/triggers/community/{chatId}', {
          signal,
          params: { header: { tmaInitData: '' }, path: { chatId } }
        })
      ).data as unknown as Triggers,
    initialData: null
  });
}
