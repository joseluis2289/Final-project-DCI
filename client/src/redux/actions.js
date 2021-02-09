export function loginUser(data) {
  return {
    type: "LOGIN_USER",
    payload: data,
  };
}

export function logoutUser() {
  return {
    type: "LOGOUT_USER",
  };
}
