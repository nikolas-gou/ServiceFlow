import { useQuery } from '@tanstack/react-query';
import { MotorRepository } from '../components/Repositories/MotorRepository';

const MOTORS_KEY = 'motors';

export function useMotors() {
  return useQuery({
    queryKey: [MOTORS_KEY],
    queryFn: () => MotorRepository.getAll(),
  });
}

export function useMotorById(motorId: number | string | null | undefined) {
  return useQuery({
    queryKey: [MOTORS_KEY, motorId],
    queryFn: () => MotorRepository.getById(motorId as number | string),
    enabled: !!motorId,
  });
}

export function useMotorRepairs(motorId: number | string | null | undefined) {
  return useQuery({
    queryKey: [MOTORS_KEY, motorId, 'repairs'],
    queryFn: () => MotorRepository.getRepairsByMotorId(motorId as number | string),
    enabled: !!motorId,
  });
}
