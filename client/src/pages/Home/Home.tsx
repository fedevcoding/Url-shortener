import { useRef } from "react";
import { useAliases } from "@hooks/useAliases";
import Header from "./Header";
import "./Home.scss";
import Table from "./Table";
import { useMutation } from "@tanstack/react-query";
import { queryServer } from "@main";
import Loader from "@components/Loader";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addAlias } = useAliases();

  const createMutation = useMutation({
    mutationFn: async (value: string) => {
      const res = await queryServer.newUrl(value);

      if (res instanceof Error) return;
      const { shortUrl, url } = res;

      addAlias(url, shortUrl);
    },
  });

  const handleShrink = async () => {
    const input = inputRef.current;
    if (input) {
      createMutation.mutate(input.value);
      input.value = "";
    }
  };

  return (
    <section id="home">
      <Header />
      <h1 className="title">Shorten a URL</h1>
      <form
        className="input-container row"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Paste your URL here"
          className="input"
        />
        <button
          className="button"
          onClick={() => !createMutation.isLoading && handleShrink()}
        >
          {createMutation.isLoading ? <Loader /> : "Shrink"}
        </button>
      </form>
      <hr />

      <Table />
    </section>
  );
};

export default Home;
