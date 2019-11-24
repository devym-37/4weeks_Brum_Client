// Initial State
const initialState = {
  title: null,
  category: null,
  departures: null,
  arrivals: null,
  desiredArrival: null,
  price: null,
  details: null,
  images: null,
  isPrice: false
};

// Reducers (Modifies The State And Returns A New State)
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE": {
      return {
        category: action.category,
        departures: action.departures,
        arrivals: action.arrivals,
        desiredArrival: action.desiredArrival,
        price: action.price,
        details: action.details,
        title: action.title,
        isPrice: action.isPrice,
        images: [...action.images]
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default orderReducer;
