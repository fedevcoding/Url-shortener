import { ArrayMapper } from "@components";
import { CLIENT_URL } from "@constants";
import { useAliases } from "@hooks";

const Table = () => {
  const { aliases, removeAlias } = useAliases();

  return (
    <div className="table-section">
      <h1>Your saved URLs</h1>

      {aliases.length === 0 ? (
        <p>No URLs saved or created</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Long URL</th>
              <th>Short URL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <ArrayMapper
              array={aliases}
              dependencyArray={[aliases]}
              mapper={({ longUrl, shortUrl }, index, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <a href={longUrl}>{longUrl}</a>
                    </td>
                    <td>
                      <a href={`${CLIENT_URL}/${shortUrl}`}>
                        {CLIENT_URL}/{shortUrl}
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          removeAlias(shortUrl);
                        }}
                        className="button"
                      >
                        Hide
                      </button>
                    </td>
                  </tr>
                );
              }}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
