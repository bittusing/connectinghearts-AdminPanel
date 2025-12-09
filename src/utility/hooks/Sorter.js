export const defaultSort = (a, b, key) => {
  if (a[key] < b[key]) return -1;
  if (b[key] < a[key]) return 1;
  return 0;
};
