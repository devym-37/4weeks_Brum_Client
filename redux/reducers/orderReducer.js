// Initial State
const initialState = {
  title: null,
  category: null,
  // departures: null,
  // arrivals: null,
  desiredArrivalTime: null,
  price: null,
  details: "",
  images: null,
  isPrice: false,
  orderId: null
};

// Reducers (Modifies The State And Returns A New State)
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY": {
      return {
        ...state,
        category: action.category
      };
    }
    case "CREATE_DEPARTURES": {
      return {
        ...state,
        departures: action.departures
      };
    }
    case "CREATE_ARRIVALS": {
      return {
        ...state,
        arrivals: action.arrivals
      };
    }
    case "CREATE_DESIRED_ARRIVAL": {
      return {
        ...state,
        desiredArrivalTime: action.desiredArrival
      };
    }
    case "CREATE_PRICE": {
      return {
        ...state,
        price: action.price
      };
    }
    case "CREATE_DETAILS": {
      return {
        ...state,
        details: action.details
      };
    }

    case "CREATE_TITLE": {
      return {
        ...state,
        title: action.title
      };
    }
    case "CREATE_ISPRICE": {
      return {
        ...state,
        isPrice: !state.isPrice
      };
    }

    case "CREATE_IMAGES": {
      return {
        ...state,
        images: action.images
      };
    }

    case "SAVE_ORDERID": {
      return {
        ...state,
        orderId: action.orderId
      };
    }
    case "DELETE_IMAGES": {
      return {
        ...state,
        images: state.images.pop()
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
