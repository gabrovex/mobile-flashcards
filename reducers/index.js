import { GET_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from "../actions/index";

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
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: state[action.title].questions.concat([action.card]),
        },
      };
    default:
      return state;
  }
}

export default decks;
