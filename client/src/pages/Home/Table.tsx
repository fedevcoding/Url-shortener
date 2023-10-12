import { ArrayMapper } from "@components";
import { useAliases } from "@hooks";

const Table = () => {
  const { aliases, removeAlias } = useAliases();

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
                  removeAlias(alias);
                }}
              >
                Hide
              </button>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Table;
