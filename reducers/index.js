import { GET_DECKS, ADD_DECK } from "../actions/index";

function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };
    default:
      return state;
  }
}

export default decks;
