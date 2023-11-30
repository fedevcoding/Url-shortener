import { ArrayMapper } from "@components";
import { CLIENT_URL } from "@constants";
import { useAliases } from "@hooks";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";

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
              <th className="remove-650"></th>
              <th className="remove-1024">Long URL</th>
              <th>Short URL</th>
              <th className="remove-550"></th>
            </tr>
          </thead>
          <tbody>
            <ArrayMapper
              array={aliases}
              dependencyArray={[aliases]}
              mapper={({ longUrl, shortUrl }, index, key) => {
                const formattedShorUrl = `${CLIENT_URL}/${shortUrl}`;

                return (
                  <tr key={key}>
                    <td className="remove-650">
                      <p>{index + 1}</p>
                    </td>
                    <td className="remove-1024">
                      <i
                        onClick={() => copy(longUrl)}
                        className="fa-solid fa-copy"
                        style={{ marginRight: "10px", cursor: "pointer" }}
                      ></i>
                      <a href={longUrl} target="_blank">
                        {longUrl}
                      </a>
                    </td>
                    <td>
                      <i
                        onClick={() => copy(longUrl)}
                        className="fa-solid fa-copy"
                        style={{ marginRight: "10px", cursor: "pointer" }}
                      ></i>
                      <a href={formattedShorUrl} target="_blank">
                        {formattedShorUrl}
                      </a>
                    </td>
                    <td className="actions remove-550">
                      <Link to={`/stats?id=${shortUrl}`}>
                        <button className="button">Stats</button>
                      </Link>
                      <button
                        onClick={() => {
                          removeAlias(shortUrl);
                        }}
                        className="button red remove-1024"
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
