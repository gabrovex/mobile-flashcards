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