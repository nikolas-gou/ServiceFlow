import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RepairRepository } from '../components/Repositories/RepairRepository';

const REPAIRS_KEY = 'repairs';

export function useRepairsQuery(params) {
  const cleanParams = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      cleanParams[key] = value;
    }
  });

  return useQuery({
    queryKey: [REPAIRS_KEY, cleanParams],
    queryFn: () => RepairRepository.getPaginated(cleanParams),
    placeholderData: (prev) => prev,
  });
}

export function useRepairsTrashQuery(params) {
  const cleanParams = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      cleanParams[key] = value;
    }
  });

  return useQuery({
    queryKey: [REPAIRS_KEY, 'trash', cleanParams],
    queryFn: () => RepairRepository.getTrashPaginated(cleanParams),
    placeholderData: (prev) => prev,
  });
}

export function useRestoreRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (repairId) => RepairRepository.restore(repairId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPAIRS_KEY] });
    },
  });
}

export function useRepairById(id) {
  return useQuery({
    queryKey: [REPAIRS_KEY, id],
    queryFn: () => RepairRepository.getRepairById(id),
    enabled: !!id,
  });
}

export function useCreateRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (repair) => RepairRepository.createNewRepair(repair),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPAIRS_KEY] });
    },
  });
}

export function useUpdateRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => RepairRepository.updateRepair(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPAIRS_KEY] });
    },
  });
}

export function useSoftDeleteRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (repairId) => RepairRepository.softDelete(repairId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPAIRS_KEY] });
    },
  });
}
