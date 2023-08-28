/* eslint-disable */
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useReducer, useRef } from 'react';

/**
 * @description
 * This custom hook is responsible to prepare the endpoint with
 * optional updated params that will be used
 * as soon as the button to send the request is clicked.
 */
export const useStructureEndpoint = <T>({
  endpoint,
  queryParams,
}: {
  endpoint: string;
  queryParams: { name: string; value: string }[];
}) => {
  type InitialApiState<T> = {
    isLoading: boolean;
    hasError: boolean;
    data: T | null;
  };

  const [state, updateApiState] = useReducer(
    (state: InitialApiState<T>, updatedState: Partial<InitialApiState<T>>) => {
      return { ...state, ...updatedState };
    },
    {
      isLoading: false,
      hasError: false,
      data: null,
    }
  );

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

  function sendRequest(): void {
    updateApiState({ isLoading: true });

    axios<T>({
      method: 'GET',
      ...updatedAxiosConfig.current,
    })
      .then(({ data }) => updateApiState({ data }))
      .catch((err: unknown) => {
        updateApiState({ hasError: true });
        console.error(err);
      })
      .finally(() => updateApiState({ isLoading: false }));
  }

  return {
    sendRequest,
    ...state,
  };
};
