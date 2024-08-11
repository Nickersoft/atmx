/* Sorts an array of items into groups */
export const group = <T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key,
): Partial<Record<Key, T[]>> => {
  return array.reduce(
    (acc, item) => {
      const groupId = getGroupId(item);

      if (!acc[groupId]) {
        acc[groupId] = [];
      }

      acc[groupId].push(item);

      return acc;
    },
    {} as Record<Key, T[]>,
  );
};
