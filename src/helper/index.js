export const LOCATIONS = [
  {
    id: 0,
    name: "Ha Noi",
  },
  {
    id: 1,
    name: "Ho Chi Minh",
  },
  {
    id: 2,
    name: "Da Lat",
  },
  {
    id: 3,
    name: "Can Tho",
  },
];

export const convertTemp = (k) => {
  return Math.floor(k - 272.15);
};