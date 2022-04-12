export const compare = (n1, n2) => {
  if (n1.name < n2.name) return -1;
  else if (n1.name > n2.name) return 1;
  else return 0;
};
