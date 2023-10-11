import Header from "./Header";
import "./Home.scss";
import Table from "./Table";

const Home = () => {
  return (
    <section id="home">
      <Header />
      <h1 className="title">Shorten a URL</h1>
      <div className="input-container row">
        <input
          type="text"
          placeholder="Paste your URL here"
          className="input"
        />
        <button className="button">Shrink</button>
      </div>

      <Table />
    </section>
  );
};

export default Home;
