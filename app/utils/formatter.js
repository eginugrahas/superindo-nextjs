export function getShortName(inputString) {
  const words = inputString.split(" ");
  const firstLetters = words.map((word) => word.charAt(0));
  return firstLetters.join("");
}
