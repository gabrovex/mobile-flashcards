export const ADD_DECK = "ADD_DECK";
export const GET_DECKS = "GET_DECKS";

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}