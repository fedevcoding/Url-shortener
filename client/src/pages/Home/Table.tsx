import { ArrayMapper } from "@components";
import { useLocalStorage } from "usehooks-ts";

const Table = () => {
  const [aliases, setAliases] = useLocalStorage<string[]>("aliases", []);

  return (
    <div>
      <ArrayMapper
        array={aliases}
        dependencyArray={[aliases]}
        mapper={(alias, _, key) => {
          return (
            <div key={key}>
              <p>{alias}</p>
              <button
                onClick={() => {
                  setAliases(aliases.filter((a) => a !== alias));
                }}
              >
                Hide
              </button>
            </div>
          );
        }}
      />
      <div
        onClick={() => {
          setAliases([...aliases, Math.random().toString()]);
        }}
      >
        add
      </div>
    </div>
  );
};

export default Table;
