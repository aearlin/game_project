import * as api from "../api";
import { LOGIN, LOGOUT } from "../constants/actionTypes";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: LOGIN, data });
    history.push("/");
    messages.success("Signed up successfully");
  } catch (error) {
    messages.error(error.response.data.message);
  }
}

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, data });
    history.push("/");
    messages.success("Logged in successfully");
  } catch (error) {
    messages.error(error.response.data.message);
  }
}

export const changePassword = (history) => async (dispatch) => {
  try {
    const { data } = await api.logout();
    dispatch({ type: LOGOUT, data });
    history.push("/");
    messages.success("Password changed successfully");
  } catch (error) {
    messages.error(error.response.data.message);
  }
}
