import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ConnectionRepository } from '../components/Repositories/ConnectionRepository';
import { cleanQueryParams, type QueryParams } from '../types/api';
import type { ConnectionJSON } from '../components/Models/Connection';

const CONNECTIONS_KEY = 'connections';

export function useConnectionsQuery(params: QueryParams) {
  const cleanParams = cleanQueryParams(params);

  return useQuery({
    queryKey: [CONNECTIONS_KEY, cleanParams],
    queryFn: () => ConnectionRepository.getPaginated(cleanParams),
    placeholderData: (prev) => prev,
  });
}

export function useConnectionById(id: number | string | null | undefined) {
  return useQuery({
    queryKey: [CONNECTIONS_KEY, id],
    queryFn: () => ConnectionRepository.getConnectionById(id as number | string),
    enabled: !!id,
  });
}

export function useCreateConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connection: Partial<ConnectionJSON>) =>
      ConnectionRepository.createConnection(connection),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONNECTIONS_KEY] });
    },
  });
}

export function useUpdateConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<ConnectionJSON> }) =>
      ConnectionRepository.updateConnection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONNECTIONS_KEY] });
    },
  });
}

export function useDeleteConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connectionId: number | string) =>
      ConnectionRepository.deleteConnection(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONNECTIONS_KEY] });
    },
  });
}
