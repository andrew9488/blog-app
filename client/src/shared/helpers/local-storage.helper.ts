const TOKEN_KEY = "blog-app-token";

const setUserToken = (token: string) => {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
};

const getUserToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

const removeUserToken = () => {
  return sessionStorage.removeItem(TOKEN_KEY);
};

const tokenActions = {
  setUserToken,
  getUserToken,
  removeUserToken,
};

export default tokenActions;
