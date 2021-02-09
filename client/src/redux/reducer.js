const initialState = { username: true };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      console.log("REDUX ACTION LOGIN USER", action.payload);
      return { ...state, username: action.payload.username };

    case "LOGOUT_USER":
      console.log("REDUX ACTION LOGOUT USER");
      return { ...state, username: false };

    default:
      return state;
  }
};

export default reducer;
