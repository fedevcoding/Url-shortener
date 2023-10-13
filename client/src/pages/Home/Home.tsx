import { useRef } from "react";
import { useAliases } from "@hooks/useAliases";
import Header from "./Header";
import "./Home.scss";
import Table from "./Table";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addAlias } = useAliases();

  const handleShrink = async () => {
    const input = inputRef.current;
    if (input) {
      const json: {
        shortUrl: string;
        url: string;
      } = await (
        await fetch(`http://localhost:3000/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longUrl: input.value,
          }),
        })
      ).json();

      const { shortUrl, url } = json;

      addAlias(url, shortUrl);
      input.value = "";
    } else {
      // toast error
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
        <button className="button" onClick={handleShrink}>
          Shrink
        </button>
      </form>
      <hr />

      <Table />
    </section>
  );
};

export default Home;
