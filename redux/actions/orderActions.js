export const categorySaver = category => ({
  type: "CREATE_CATEGORY",
  category: category
});

export const departureSaver = departures => ({
  type: "CREATE_DEPARTURES",
  departures: departures
});

export const arrivalSaver = arrivals => ({
  type: "CREATE_ARRIVALS",
  arrivals: arrivals
});

export const timeSaver = time => ({
  type: "CREATE_DESIRED_ARRIVAL",
  desiredArrival: time
});

export const priceSaver = price => ({
  type: "CREATE_PRICE",
  price: price
});

export const isPriceSaver = isPrice => ({
  type: "CREATE_ISPRICE",
  isPrice: isPrice
});

export const detailsSaver = details => ({
  type: "CREATE_DETAILS",
  details: details
});

export const titleSaver = title => ({
  type: "CREATE_TITLE",
  title: title
});

export const imagesSaver = images => ({
  type: "CREATE_IMAGES",
  images: images
});

export const orderIdSaver = orderId => ({
  type: "SAVE_ORDERID",
  orderId: orderId
});

export const photoRemover = () => ({
  type: "DELETE_IMAGES"
});
