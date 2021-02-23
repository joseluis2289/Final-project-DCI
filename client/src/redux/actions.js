import axios from "axios";

//USER ACTIONS
export function userLogin({ logIn, user }) {
  return {
    type: "USER_LOGIN",
    payload: { logIn, user },
  };
}

export function userLogout() {
  return {
    type: "USER_LOGOUT",
  };
}

// FILTER ACTIONS

export function filterFree(status) {
  return {
    type: "FILTER_FREE",
    payload: status,
  };
}
export function filterPaid(status) {
  return {
    type: "FILTER_PAID",
    payload: status,
  };
}
export function filterRating(rating) {
  return {
    type: "FILTER_RATING",
    payload: rating,
  };
}

//RESOURCES ACTIONS
export const getResources = () => async (dispatch) => {
  axios
    .get("http://localhost:5000/resources/")
    .then((res) => {
      dispatch({
        type: "GET_RESOURCES",
        payload: [res.data[0]],
      });
      console.log("data from action", res.data);
    })
    .catch((error) => {
      dispatch({
        type: "RESOURCES_ERROR",
        payload: error,
      });
    });
};
