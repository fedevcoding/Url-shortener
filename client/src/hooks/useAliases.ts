import { useLocalStorage } from "usehooks-ts";

export const useAliases = () => {
  const [aliases, setAliases] = useLocalStorage<
    {
      longUrl: string;
      shortUrl: string;
    }[]
  >("aliases", []);

  const addAlias = (longUrl: string, shortUrl: string) => {
    setAliases([
      {
        longUrl,
        shortUrl,
      },
      ...aliases,
    ]);
  };

  const removeAlias = (alias: string) => {
    setAliases(aliases.filter((a) => a.shortUrl !== alias));
  };

  return {
    aliases,
    addAlias,
    removeAlias,
  };
};
