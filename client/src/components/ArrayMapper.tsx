import { Key, useMemo } from "react";

export const ArrayMapper = <T,>({
  array,
  mapper,
  memo = true,
  dependencyArray,
}: {
  array: T[] | readonly T[];
  mapper: (item: T, index: number, key: Key) => JSX.Element;
  dependencyArray?: React.DependencyList[];
  memo?: boolean;
}) => {
  const mapArray = array.map((item, i) =>
    mapper(item, i, JSON.stringify(item))
  );

  const formattedDependencyArray =
    typeof dependencyArray === "undefined" ? [] : dependencyArray;

  const mappedArray = useMemo(() => mapArray, formattedDependencyArray);
  if (memo) {
    return mappedArray;
  }

  return mapArray;
};
