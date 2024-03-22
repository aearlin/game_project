import { UPDATE_LETTERS } from "../constants/actionTypes";

const initialState = {
  lettersArray: [],
};

const lettersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LETTERS:
      return { ...state, lettersArray: action.data.lettersArray };
    default:
      return state;
  }
}

export default lettersReducer;
