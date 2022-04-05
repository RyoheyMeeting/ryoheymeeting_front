/**
 * キー配列に指定されたキーを追加する
 * @param sortedKeys ソート済みキー配列
 * @param key 新しいキー
 * @param previousKey キーの前要素
 * @returns ソート済みキー配列
 */
export const addChild = (sortedKeys: string[], key: string, previousKey?: string | null): string[] => {
  if (!sortedKeys || sortedKeys.length == 0) return [key];
  if (!previousKey) return [key, ...sortedKeys];

  const index = sortedKeys.indexOf(previousKey) + 1;
  return [...sortedKeys.slice(0, index), key, ...sortedKeys.slice(index)];
};

/**
 * キー配列から指定されたキーを削除する
 * @param sortedKeys ソート済みキー配列
 * @param key 新しいキー
 * @returns ソート済みキー配列
 */
export const removeChild = (sortedKeys: string[], key: string): string[] => {
  const index = sortedKeys.indexOf(key);
  return [...sortedKeys.slice(0, index), ...sortedKeys.slice(index + 1)];
};

/**
 * キー配列の指定されたキーを並び替える
 * @param sortedKeys ソート済みキー配列
 * @param key 対象キー
 * @param previousKey 前のキー
 * @returns ソート済みキー配列
 */
export const moveChild = (sortedKeys: string[], key: string, previousKey?: string | null): string[] => {
  return addChild(removeChild(sortedKeys, key), key, previousKey);
};
