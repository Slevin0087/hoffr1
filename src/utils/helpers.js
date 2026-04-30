export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const generateId = (name) => {
  return `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const joinPath = (arrStrings, separator = "/") => {
  return arrStrings.join(separator);
};
