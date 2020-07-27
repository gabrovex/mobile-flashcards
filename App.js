import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware'
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';

const store = createStore(reducer, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NewDeck />
        <DeckList />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
