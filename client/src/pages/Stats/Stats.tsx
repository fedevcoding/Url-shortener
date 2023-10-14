import { Header } from "@components";
import { queryServer } from "@main";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const Stats = () => {
  const [searchParams] = useSearchParams();
  const statsId = searchParams.get("id");

  const { data, isError } = useQuery({
    queryKey: ["stats"],
    queryFn: () => (statsId ? queryServer.getStats(statsId) : Promise.reject()),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (!statsId) return "Search for a short url to see it's stats";

  return (
    <section>
      <Header />
      <h1>
        Views: {!isError && data && !(data instanceof Error) && data.views}
      </h1>
    </section>
  );
};

export default Stats;
