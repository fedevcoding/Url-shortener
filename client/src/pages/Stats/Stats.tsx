import { Header, Loader } from "@components";
import { queryServer } from "@main";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notFound } from "@assets";
import "./Stats.scss";
import { CLIENT_NAME } from "@constants";

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
          placeholder="Enter short URL here"
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
          <div className="stats-table">
            <div className="general-info">
              <div>
                <p className="low-opacity">Total Views</p>
                <p>{data.views}</p>
              </div>
              <div>
                <p className="low-opacity">30D Views</p>
                <p>{data.views}</p>
              </div>
              <div>
                <p className="low-opacity">7D Views</p>
                <p>{data.views}</p>
              </div>
              <div>
                <p className="low-opacity">24H Views</p>
                <p>{data.views}</p>
              </div>
            </div>
            <div className="other-info">
              <div className="activity"></div>
            </div>
            {/* <button className="button" onClick={() => refetch()}>
              {isRefetching ? <Loader /> : "Reload"}
            </button> */}
          </div>
        )
      )}

      {!statsId && (
        <div className="no-stats">
          <h3>
            Enter any short url to see it's stats (e.g {CLIENT_NAME}/test)
          </h3>
        </div>
      )}
    </section>
  );
};

export default Stats;
