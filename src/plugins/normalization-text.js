export const normalizationText = (text) => {
  return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};
