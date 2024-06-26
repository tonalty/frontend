import { useQuery } from '@tanstack/react-query';
import { User } from 'node-telegram-bot-api';

import { CommunityUser } from '@/interfaces/CommunityUser';
import { LinkOwner } from '@/interfaces/LinkOwner';
import { apiClient } from './apiClient';

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
