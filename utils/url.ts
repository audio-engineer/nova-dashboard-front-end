export const getIdFromHref = (href: string): string => {
  return href.split("/").pop() ?? "";
};
