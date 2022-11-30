import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
};

export const register = async (user) => {
  try {
    return await authService.register(user);
  } catch (error) {
    return "Sorry, failed to register";
  }
};

export const login = async (user) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return "Sorry, failed to login";
  }
};

export const logout = async () => {
  await authService.logout();
};

export default user;
