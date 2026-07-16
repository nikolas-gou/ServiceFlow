import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ConnectionRepository } from '../components/Repositories/ConnectionRepository';

const CONNECTIONS_KEY = 'connections';

export function useConnectionsQuery(params) {
  const cleanParams = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      cleanParams[key] = value;
    }
  });

  return useQuery({
    queryKey: [CONNECTIONS_KEY, cleanParams],
    queryFn: () => ConnectionRepository.getPaginated(cleanParams),
    placeholderData: (prev) => prev,
  });
}

export function useConnectionById(id) {
  return useQuery({
    queryKey: [CONNECTIONS_KEY, id],
    queryFn: () => ConnectionRepository.getConnectionById(id),
    enabled: !!id,
  });
}

export function useCreateConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connection) => ConnectionRepository.createConnection(connection),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONNECTIONS_KEY] });
    },
  });
}

export function useUpdateConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => ConnectionRepository.updateConnection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONNECTIONS_KEY] });
    },
  });
}

export function useDeleteConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connectionId) => ConnectionRepository.deleteConnection(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONNECTIONS_KEY] });
    },
  });
}
