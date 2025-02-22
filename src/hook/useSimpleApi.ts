import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL =
  "https://20chwwv7aa.execute-api.ap-northeast-2.amazonaws.com/simple-api";

export const useSimpleApi = () => {
  const { data } = useQuery({
    queryFn: async () => await axios(API_URL),
    queryKey: ["simple-api"],
  });

  return { data };
};
