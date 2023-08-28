/* eslint-disable */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useApiPerformance = () => {
  const [timeTaken, setTimeTaken] = useState<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    axios.interceptors.response.use((res) => {
      const endTime = performance.now();
      const elapsedTimeMs = endTime - startTime;
      const roundedElapsedTimeSeconds = Math.round(elapsedTimeMs / 1000);

      setTimeTaken(roundedElapsedTimeSeconds);

      return res;
    });

    return () => {
      setTimeTaken(0);
    };
  }, []);

  return timeTaken;
};
