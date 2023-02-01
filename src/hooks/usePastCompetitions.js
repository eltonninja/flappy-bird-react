import axios from "axios";
import { useQuery } from "react-query";

export function usePastCompetitions() {
  const { data, isLoading, isError, error } = useQuery(
    "past-competitions",
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/past-competitions`)
        .then((res) => res.data)
  );

  return { data, isLoading, isError, error };
}
