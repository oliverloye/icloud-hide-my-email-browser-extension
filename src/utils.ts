// Deep equality for JSON-like values (primitives, arrays and plain objects).
export const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) {
    return true;
  }

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null ||
    Array.isArray(a) !== Array.isArray(b)
  ) {
    return false;
  }

  const aRecord = a as Record<string, unknown>;
  const bRecord = b as Record<string, unknown>;
  const aKeys = Object.keys(aRecord);

  return (
    aKeys.length === Object.keys(bRecord).length &&
    aKeys.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(bRecord, key) &&
        isEqual(aRecord[key], bRecord[key])
    )
  );
};

// Converts a camelCase identifier to Start Case (e.g. contextMenu -> Context Menu).
export const startCase = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (firstChar) => firstChar.toUpperCase());
