import { useState } from 'react';
import { generateRandomId } from '../utils/generate-random-id';

export const useQueryParams = () => {
  const [queryParamsMap, setQueryParamsMap] = useState(() => {
    const id = generateRandomId();

    return new Map<string, { name: string; value: string }>().set(id, {
      name: '',
      value: '',
    });
  });

  function addNewQueryParam(): void {
    setQueryParamsMap((prevQueryParams) => {
      const updatedQueryParams = new Map(prevQueryParams);

      const id = generateRandomId();
      updatedQueryParams.set(id, { name: '', value: '' });

      return updatedQueryParams;
    });
  }

  function deleteQueryParam(key: string): void {
    setQueryParamsMap((prevQueryParams) => {
      if (!prevQueryParams.has(key)) return prevQueryParams;

      const updatedQueryParams = new Map(prevQueryParams);
      updatedQueryParams.delete(key);

      return updatedQueryParams;
    });
  }

  function updateQueryParam(
    key: string,
    valueToUpdate: { name: string; value: string }
  ): void {
    setQueryParamsMap((prevQueryParams) => {
      if (!prevQueryParams.has(key)) return prevQueryParams;

      const updatedQueryParams = new Map(prevQueryParams);
      updatedQueryParams.set(key, {
        ...(updatedQueryParams.get(key) as { name: string; value: string }),
        ...valueToUpdate,
      });

      return updatedQueryParams;
    });
  }

  return {
    updatedQueryParams: queryParamsMap,
    addNewQueryParam,
    deleteQueryParam,
    updateQueryParam,
  };
};
