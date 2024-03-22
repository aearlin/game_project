import { fetchLetters } from "../api";
import { UPDATE_LETTERS } from "../constants/actionTypes";

export const getLetters = () => async (dispatch) => {
  try {
    const { data } = await fetchLetters();
    dispatch({ type: UPDATE_LETTERS, data });
    return { data };
  } catch (error) {
    console.error('Error getting letters:', error);
    throw error;
  }
};
