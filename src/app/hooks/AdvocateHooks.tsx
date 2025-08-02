import { useState } from "react";

export const useGetAdvocates = () => {
  const [data, setData] = useState<AdvocateEntity[]>();
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const request = (search: string = "", page: number) => {
    setIsLoading(true);
    fetch(`/api/advocates?search=${search}&page=${page}`).then((response) => {
      response
        .json()
        .then((jsonResponse) => {
          setData(jsonResponse.data);
          setCount(jsonResponse.count);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
        })
        .finally(() => setIsLoading(false));
    });
  };

  return { data, count, error, isLoading, request };
};
