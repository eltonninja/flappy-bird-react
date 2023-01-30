import axios from "axios";
import { useQuery } from "react-query";

export function usePrizes() {
  const { data, isLoading, isError, error } = useQuery(
    ["prizes"],
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/prizes`)
        .then((res) => res.data),
    {
      refetchInterval: 10000,
    }
  );

  return { data, isLoading, isError, error };
}
