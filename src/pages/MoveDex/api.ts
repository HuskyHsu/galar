import { Move } from '@/types/Pokemon';
import { api } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export type MoveType = Move & { TMPid: number | null } & { TRPid: number | null } & {
  tutors: boolean;
};

export const useMoveListInfo = () => {
  const { data, status, ...rest } = useQuery<MoveType[]>(['move'], () =>
    api<MoveType[]>(`/data/move_list_132.json`)
  );

  return {
    status,
    data: data ?? [],
    ...rest,
  };
};
