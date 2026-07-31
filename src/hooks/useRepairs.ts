import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RepairRepository } from '../components/Repositories/RepairRepository';
import { cleanQueryParams, type QueryParams } from '../types/api';
import type { Repair, RepairJSON } from '../components/Models/Repair';

const REPAIRS_KEY = 'repairs';

interface RepairMutationPayload {
  repair: Repair | Partial<RepairJSON>;
}

export function useRepairsQuery(params: QueryParams) {
  const cleanParams = cleanQueryParams(params);

  return useQuery({
    queryKey: [REPAIRS_KEY, cleanParams],
    queryFn: () => RepairRepository.getPaginated(cleanParams),
    placeholderData: (prev) => prev,
  });
}

export function useRepairsTrashQuery(params: QueryParams) {
  const cleanParams = cleanQueryParams(params);

  return useQuery({
    queryKey: [REPAIRS_KEY, 'trash', cleanParams],
    queryFn: () => RepairRepository.getTrashPaginated(cleanParams),
    placeholderData: (prev) => prev,
  });
}

export function useRestoreRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (repairId: number | string) => RepairRepository.restore(repairId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPAIRS_KEY] });
    },
  });
}

export function useRepairById(id: number | string | null | undefined) {
  return useQuery({
    queryKey: [REPAIRS_KEY, id],
    queryFn: () => RepairRepository.getRepairById(id as number | string),
    enabled: !!id,
  });
}

export function useCreateRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (repair: RepairMutationPayload) => RepairRepository.createNewRepair(repair),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPAIRS_KEY] });
    },
  });
}

export function useUpdateRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: RepairMutationPayload }) =>
      RepairRepository.updateRepair(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPAIRS_KEY] });
    },
  });
}

export function useSoftDeleteRepair() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (repairId: number | string) => RepairRepository.softDelete(repairId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPAIRS_KEY] });
    },
  });
}
