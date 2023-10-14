import { queryServer } from "@main";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Redirect = () => {
  const { url } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["resolve"],
    queryFn: () => queryServer.solveUrl(url as string),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (!isError && !(data instanceof Error) && data)
    window.location.replace(data.resolvedUrl as string);
  if (isError || queryServer.isError(data))
    return <p>No alias found for this URL</p>;
  if (isLoading) return <p>Loading...</p>;
};

export default Redirect;
