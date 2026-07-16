import { useQuery } from '@tanstack/react-query';
import { CustomerRepository } from '../components/Repositories/CustomerRepository';

const CUSTOMERS_KEY = 'customers';

export function useCustomers() {
  return useQuery({
    queryKey: [CUSTOMERS_KEY],
    queryFn: () => CustomerRepository.getAll(),
  });
}

export function useCustomerNames() {
  return useQuery({
    queryKey: [CUSTOMERS_KEY, 'names'],
    queryFn: () => CustomerRepository.listOfNames(),
  });
}
