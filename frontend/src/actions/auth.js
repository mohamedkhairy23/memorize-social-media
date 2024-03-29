import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/posts");
  } catch (err) {
    console.log(err);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/posts");
  } catch (err) {
    console.log(err);
  }
};
