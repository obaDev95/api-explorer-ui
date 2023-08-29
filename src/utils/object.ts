export function isObject(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

export function isArray(value: unknown) {
  return value && Array.isArray(value);
}
