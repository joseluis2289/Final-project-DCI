const initialState = {
  user: {},
  logIn: false,
  resources: [],
  filter: {
    rating: 0, // show all
    frontend: true,
    backend: true,
    database: true,
    general: true,
  },
  loginData: {
    logIn: false,
    accessToken: "",
    refreshToken: "",
  },
};

// TODO: add multireducer -- one for user, one for filter

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOGIN":
      return { ...state, logIn: payload.logIn, user: payload.user };

    case "USER_LOGOUT":
      return { ...state, user: {}, logIn: payload };

    case "FILTER_CATEGORY":
      return {
        ...state,
        filter: { ...state.filter, [payload.category]: payload.display },
      };

    case "FILTER_FREE":
      return { ...state, filter: { ...state.filter, free: payload } };

    case "FILTER_PAID":
      return { ...state, filter: { ...state.filter, paid: payload } };

    case "FILTER_RATING":
      return { ...state, filter: { ...state.filter, rating: payload } };

    case "GET_RESOURCES":
      return {
        ...state,
        resources: payload,
      };
    case "SEARCH_RESOURCES":
      return {
        ...state,
        resources: payload,
      };
    case "RESOURCES_ERROR":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
