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
  isPrice: false,
  orderId: null
};

// Reducers (Modifies The State And Returns A New State)
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY": {
      return {
        category: action.category
      };
    }
    case "CREATE_DEPARTURES": {
      return {
        departures: action.departures
      };
    }
    case "CREATE_ARRIVALS": {
      return {
        arrivals: action.arrivals
      };
    }
    case "CREATE_DESIRED_ARRIVAL": {
      return {
        desiredArrival: action.desiredArrival
      };
    }
    case "CREATE_PRICE": {
      return {
        price: action.price
      };
    }
    case "CREATE_DETAILS": {
      return {
        details: action.details
      };
    }

    case "CREATE_TITLE": {
      return {
        title: action.title
      };
    }
    case "CREATE_ISPRICE": {
      return {
        isPrice: action.isPrice
      };
    }

    case "CREATE_IMAGES": {
      return {
        images: action.images
      };
    }

    case "SAVE_ORDERID": {
      return {
        orderId: action.orderId
      };
    }
    case "DELETE_IMAGES": {
      return {
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
