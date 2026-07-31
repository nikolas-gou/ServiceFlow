import { useMutation } from '@tanstack/react-query';
import { ImageRepository } from '../components/Repositories/ImageRepository';

export function useUploadImages() {
  return useMutation({
    mutationFn: ({ files, repairId }: { files: File[]; repairId: number | string }) =>
      ImageRepository.uploadImages(files, repairId),
  });
}

export function useDeleteImages() {
  return useMutation({
    mutationFn: (filesToDelete: Array<number | string>) =>
      ImageRepository.deleteImages(filesToDelete),
  });
}
