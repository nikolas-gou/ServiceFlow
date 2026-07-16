import { useMutation } from '@tanstack/react-query';
import { ImageRepository } from '../components/Repositories/ImageRepository';

export function useUploadImages() {
  return useMutation({
    mutationFn: ({ files, repairId }) => ImageRepository.uploadImages(files, repairId),
  });
}

export function useDeleteImages() {
  return useMutation({
    mutationFn: (filesToDelete) => ImageRepository.deleteImages(filesToDelete),
  });
}
