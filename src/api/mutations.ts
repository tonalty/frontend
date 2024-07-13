import { useMutation } from '@tanstack/react-query';

import { CreatedTempImage } from '@/interfaces/CreatedTempImage';
import { apiClient } from './apiClient';
import { paths } from './schema';

export function useCreateImage() {
  return useMutation({
    mutationKey: [],
    mutationFn: async (
      body: paths['/backend/image']['post']['requestBody']['content']['multipart/form-data']
    ) =>
      (
        await apiClient.POST('/backend/image', {
          params: { header: { tmaInitData: '' } },
          body,
          bodySerializer: (body) => {
            const formData = new FormData();
            formData.set('file', body.file);
            return formData;
          }
        })
      ).data as unknown as CreatedTempImage
  });
}

export function useCreateReward() {
  return useMutation({
    mutationKey: [],
    mutationFn: async (
      body: paths['/backend/reward']['post']['requestBody']['content']['application/json']
    ) =>
      (
        await apiClient.POST('/backend/reward', {
          params: { header: { tmaInitData: '' } },
          body
        })
      ).data
  });
}

export function useUpdateReward() {
  return useMutation({
    mutationKey: [],
    mutationFn: async (
      body: paths['/backend/reward']['put']['requestBody']['content']['application/json']
    ) =>
      (
        await apiClient.PUT('/backend/reward', {
          params: { header: { tmaInitData: '' } },
          body
        })
      ).data
  });
}

export function useUpdateTriggers() {
  return useMutation({
    mutationKey: [],
    mutationFn: async (
      body: paths['/backend/triggers/community']['patch']['requestBody']['content']['application/json']
    ) =>
      (
        await apiClient.PATCH('/backend/triggers/community', {
          params: { header: { tmaInitData: '' } },
          body
        })
      ).data
  });
}

export function useUpdateSettings() {
  return useMutation({
    mutationKey: ['updateSettings'],
    mutationFn: async (
      body: paths['/backend/community/settings']['patch']['requestBody']['content']['application/json']
    ) =>
      (
        await apiClient.PATCH('/backend/community/settings', {
          params: { header: { tmaInitData: '' } },
          body
        })
      ).data as unknown as boolean
  });
}

export function useBuyReward() {
  return useMutation({
    mutationKey: [],
    mutationFn: async (
      path: paths['/backend/reward/{rewardId}/chat/{chatId}/buy']['post']['parameters']['path']
    ) =>
      (
        await apiClient.POST('/backend/reward/{rewardId}/chat/{chatId}/buy', {
          params: {
            header: { tmaInitData: '' },
            path: {
              rewardId: path.rewardId,
              chatId: path.chatId
            }
          }
        })
      ).data
  });
}

export function useDeleteReward() {
  return useMutation({
    mutationKey: [],
    mutationFn: async (
      path: paths['/backend/reward/{rewardId}/chat/{chatId}']['delete']['parameters']['path']
    ) =>
      (
        await apiClient.DELETE('/backend/reward/{rewardId}/chat/{chatId}', {
          params: {
            header: { tmaInitData: '' },
            path: {
              rewardId: path.rewardId,
              chatId: path.chatId
            }
          }
        })
      ).data
  });
}

export function useReferralJoin() {
  return useMutation({
    mutationKey: [],
    mutationFn: async (
      body: paths['/backend/referrals/join']['post']['requestBody']['content']['application/json']
    ) =>
      (
        await apiClient.POST('/backend/referrals/join', {
          params: { header: { tmaInitData: '' } },
          body
        })
      ).data as unknown as void
  });
}
