import { useRef } from "react";
import { useAliases } from "@hooks/useAliases";
import Header from "./Header";
import "./Home.scss";
import Table from "./Table";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addAlias } = useAliases();

  const handleShrink = () => {
    const input = inputRef.current;
    if (input) {
      addAlias(input.value);
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

      <Table />
    </section>
  );
};

export default Home;
