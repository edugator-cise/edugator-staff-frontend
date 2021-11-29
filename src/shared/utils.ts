export function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}
