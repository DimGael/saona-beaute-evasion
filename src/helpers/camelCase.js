export default function camelCase (text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join("");
  };