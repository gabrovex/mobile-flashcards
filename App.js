import React from "react";
import { StyleSheet, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import NewDeck from "./components/NewDeck";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const DeckStack = createStackNavigator();
const DeckStackScreen = () => (
  <DeckStack.Navigator>
    <DeckStack.Screen name="DeckList" component={DeckList} options={{headerShown: false}}/>
    <DeckStack.Screen name="Deck" component={Deck} />
  </DeckStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen name="Deck List" component={DeckStackScreen}  />
    <AppTabs.Screen name="New Deck" component={NewDeck} />
  </AppTabs.Navigator>
);

export default function App() {
  return (
    <Provider store={createStore(reducer, middleware)}>
      <NavigationContainer>
        <AppTabsScreen />
      </NavigationContainer>
    </Provider>
  );
}
