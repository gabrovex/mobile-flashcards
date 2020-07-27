import { AsyncStorage } from "react-native";
import dummyDecks from "./_DATA";
const DECKS_STORAGE_KEY = "MobileFlashcards:decks";

export function fetchDecks() {
  //AsyncStorage.clear();
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
    if (results === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyDecks));
      return dummyDecks;
    }
    return JSON.parse(results);
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    })
  );
}

export function addCardToDeck(card, title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      return decks[title];
    })
    .then((deck) => {
      return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          [deck.title]: {
            title: deck.title,
            questions: deck.questions.concat([card]),
          },
        })
      );
    });
}
