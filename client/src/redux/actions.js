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
    payload: false
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

// topic = "general", "frontend", "backend", "database", "machinelearning"
// status = checkbox status = true / false
export function filterCategory(topic, status) {
  return {
    type: "FILTER_CATEGORY",
    payload: { category: topic, display: status },
  };
}

//RESOURCES ACTIONS
export const getResources = () => async (dispatch) => {
  axios
    .get("http://localhost:5000/resources/")
    .then((res) => {
      dispatch({
        type: "GET_RESOURCES",
        payload: res.data,
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

export function updateData(boolean) {
  return {
    type: "UPDATE_DATA",
    payload: boolean
  };
}

export const searchResources = (term) => async (dispatch) => {
  if (term) {
    axios
      .get("http://localhost:5000/resources/search/" + term)
      .then((res) => {
        dispatch({
          type: "SEARCH_RESOURCES",
          payload: res.data,
        });
        console.log("data from action", res.data);
      })
      .catch((error) => {
        dispatch({
          type: "RESOURCES_ERROR",
          payload: error,
        });
      });
  }
};
