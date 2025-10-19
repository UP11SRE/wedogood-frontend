import { useQuery } from '@tanstack/react-query';
import { getJobStatus } from '../api/endpoints';

export const useJobPoll = (jobId, enabled = true) => {
  return useQuery({
    queryKey: ['jobStatus', jobId],
    queryFn: () => getJobStatus(jobId),
    enabled: enabled && !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === 'success' || status === 'failed') {
        return false;
      }
      return 2000;
    },
    retry: 3,
  });
};
