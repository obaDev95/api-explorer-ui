/* eslint-disable */
import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * @description
 * Response Time Monitoring
 * *-------------------------------------------------
 * Display the time taken for the API call to complete,
 * helping users assess the performance of the API.
 */
export const useResponseTime = () => {
  const [timeTaken, setTimeTaken] = useState<number>(0);

  useEffect(() => {
    let startTime: ReturnType<typeof performance.now>;

    axios.interceptors.request.use((config) => {
      startTime = performance.now();
      return config;
    });

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
