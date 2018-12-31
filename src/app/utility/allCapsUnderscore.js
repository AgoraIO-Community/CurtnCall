export default function(value) {
  const re = /[\s_]+|([a-z0-9])(?=[A-Z])/g;
  const result = value.replace(re, "$1_").toUpperCase();

  return result;
}
