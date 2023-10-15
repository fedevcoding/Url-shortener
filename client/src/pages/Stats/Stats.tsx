import { Header, Loader } from "@components";
import { queryServer } from "@main";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Stats.scss";
import { notFound } from "@assets";

const Stats = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const statsId = searchParams.get("id");

  const { data, isError, isLoading, isRefetching, refetch } = useQuery({
    queryKey: [`stats-${statsId}`],
    queryFn: () => (statsId ? queryServer.getStats(statsId) : Promise.reject()),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleClick = () => {
    const url = inputRef.current?.value;
    if (!url) return;
    navigate(`?id=${url}`);
    inputRef.current.value = "";
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
          {isLoading ? <Loader /> : "Search"}
        </button>
      </form>

      {statsId && isError ? (
        <div
          className="column"
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "50vh",
          }}
        >
          <img src={notFound} width={"200px"} />
          <h1>Url not found</h1>
        </div>
      ) : (
        statsId &&
        data &&
        !(data instanceof Error) && (
          <div>
            <button className="button" onClick={() => refetch()}>
              {isRefetching ? <Loader /> : "Reload"}
            </button>
            <p>Total Views: {data.views}</p>
          </div>
        )
      )}
    </section>
  );
};

export default Stats;
