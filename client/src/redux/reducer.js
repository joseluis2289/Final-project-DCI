import fakeData from "../new_references";

const initialState = {
  username: false,
  resources: fakeData,
  filter: {
    rating: 0, // show all
  },
};

// TODO: add multireducer -- one for user, one for filter

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, username: action.payload.username };

    case "USER_LOGOUT":
      return { ...state, username: false };

    case "FILTER_FREE":
      return { ...state, filter: { ...state.filter, free: action.payload } };

    case "FILTER_PAID":
      return { ...state, filter: { ...state.filter, paid: action.payload } };

    case "FILTER_RATING":
      return { ...state, filter: { ...state.filter, rating: action.payload } };

    default:
      return state;
  }
};

export default reducer;
