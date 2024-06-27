import { useMutation } from '@tanstack/react-query';

import { CreatedTempImage } from '@/interfaces/CreatedTempImage';
import { apiClient } from './apiClient';
import { paths } from './schema';

export function useCreateImage() {
  return useMutation({
    mutationKey: [],
    mutationFn: async (
      body: paths['/image']['post']['requestBody']['content']['multipart/form-data']
    ) =>
      (
        await apiClient.POST('/image', {
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
      body: paths['/reward']['post']['requestBody']['content']['application/json']
    ) =>
      (
        await apiClient.POST('/reward', {
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
      body: paths['/reward']['put']['requestBody']['content']['application/json']
    ) =>
      (
        await apiClient.PUT('/reward', {
          params: { header: { tmaInitData: '' } },
          body
        })
      ).data
  });
}
