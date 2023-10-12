import { useLocalStorage } from "usehooks-ts";

export const useAliases = () => {
  const [aliases, setAliases] = useLocalStorage<string[]>("aliases", []);

  const addAlias = (alias: string) => {
    setAliases([...aliases, alias]);
  };

  const removeAlias = (alias: string) => {
    setAliases(aliases.filter((a) => a !== alias));
  };

  return {
    aliases,
    addAlias,
    removeAlias,
  };
};
