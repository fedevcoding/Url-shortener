import { Header } from "@components";
import { queryServer } from "@main";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Stats.scss";

const Stats = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const statsId = searchParams.get("id");

  const { data, isError, isLoading } = useQuery({
    queryKey: [`stats-${statsId}`],
    queryFn: () => (statsId ? queryServer.getStats(statsId) : Promise.reject()),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleClick = () => {
    const url = inputRef.current?.value;
    if (!url) return;

    navigate(`?id=${url}`);
  };

  return (
    <section id="stats">
      <Header />

      <h1 className="title">Get URL Stats</h1>

      <form className="row" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Paste short URL here"
          className="input"
        />
        <button className="button" onClick={handleClick}>
          Search
        </button>
      </form>

      {statsId && isError ? (
        "Url not found"
      ) : statsId && data && !(data instanceof Error) ? (
        <div>
          <p>Total Views: {data.views}</p>
        </div>
      ) : (
        isLoading && <>Loading</>
      )}
    </section>
  );
};

export default Stats;
