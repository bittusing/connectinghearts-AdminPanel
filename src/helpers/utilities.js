import { ROLE } from "../constants";

export function isEmpty(obj) {
  return (
    obj === null ||
    obj === "null" ||
    obj === undefined ||
    obj === "undefined" ||
    obj.length === 0
  );
}
export function humanize(text) {
  // If the input is in camelCase, split it by uppercase letters
  // If it's in snake_case, split it by underscores
  const words = text.split(/(?=[A-Z])|_/);

  // Capitalize the first letter of each word and join them with spaces
  const readableText = words
    .map((word) => {
      // Capitalize the first letter
      word = word.charAt(0).toUpperCase() + word.slice(1);
      return word;
    })
    .join(" ");

  return readableText;
}
export const getLocalData = (key) => {
  return localStorage.getItem(key);
};

export const isAdmin = () => {
  if (getLocalData("userType") === ROLE.CC_ADMIN) {
    return true;
  } else return false;
};

export const defaultSort = (a, b, key) => {  
  if (a[key] < b[key]) return -1;
  if (b[key] < a[key]) return 1;
  return 0;
};
 
// export const defaultSort = (a, b, key, ascending = true) => {
//   const compareValue = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
//   return ascending ? compareValue : -compareValue;
// }