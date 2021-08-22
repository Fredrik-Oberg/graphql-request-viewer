export default (query: string) => {
  let text = "";
  const splitted = query.replace("{\n", "").split("{");
  if (splitted[0].includes("(")) {
    text = splitted[0].split("(")[0];
  } else {
    text = splitted[0];
  }
  if (text.startsWith("query ")) {
    return text.replace("query ", "");
  }
  if (text.startsWith("mutation ")) {
    return text.replace("mutation ", "");
  }
  return text;
};
