import { queryServer } from "@main";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@components";
import { notFound } from "@assets";

const Redirect = () => {
  const { url } = useParams();

  const { data, isError } = useQuery({
    queryKey: ["resolve"],
    queryFn: () => queryServer.solveUrl(url as string),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (!isError && !(data instanceof Error) && data)
    window.location.replace(data.resolvedUrl as string);
  if (isError || queryServer.isError(data))
    return (
      <section id="not-found">
        <Header />

        <div
          className="column"
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            height: "80vh",
          }}
        >
          <img src={notFound} width={"200px"} />
          <h1>No alias found for this URL</h1>
        </div>
      </section>
    );
};

export default Redirect;
