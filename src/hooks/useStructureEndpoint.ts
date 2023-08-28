/* eslint-disable */
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useRef } from 'react';

/**
 * @description
 * This custom hook is responsible to prepare the endpoint with
 * optional updated params that will be used
 * as soon as the button to send the request is clicked.
 */
export const useStructureEndpoint = ({
  endpoint,
  queryParams,
}: {
  endpoint: string;
  queryParams: { name: string; value: string }[];
}) => {
  const updatedAxiosConfig = useRef<Pick<AxiosRequestConfig, 'url' | 'params'>>({
    url: undefined,
    params: undefined,
  });

  useEffect(() => {
    updatedAxiosConfig.current = {
      url: endpoint,
      params: queryParams.map(({ name, value }) => ({ [name]: value })),
    };
  }, [endpoint, queryParams]);

  function sendRequest<T>(): void {
    axios<T>({
      method: 'GET',
      ...updatedAxiosConfig.current,
    })
      .then(console.log)
      .catch(console.error);
  }

  return {
    sendRequest,
  };
};
