export const categorySaver = category => ({
  type: "CREATE",
  category: category
});

export const titleSaver = title => ({
  type: "CREATE",
  title: title
});

export const timeSaver = time => ({
  type: "CREATE",
  desiredArrival: time
});

export const checkedSaver = cheked => ({
  type: "CREATE",
  isPrice: cheked
});
