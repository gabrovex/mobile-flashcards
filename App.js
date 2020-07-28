import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import NewDeck from "./components/NewDeck";
import Quiz from "./components/Quiz";
import NewCard from "./components/NewCard";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

const theme = {
  Text: {
    style: {
      fontSize: 20,
      margin: 10,
    },
  },
  Button: {
    buttonStyle: {
      margin: 10,
    },
  },
  Card: {
    containerStyle: {
      flex: 1,
      padding: 0,
      margin: 0,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  },
};

const DeckStack = createStackNavigator();
const DeckStackScreen = () => (
  <DeckStack.Navigator>
    <DeckStack.Screen
      name="DeckList"
      component={DeckList}
      options={{ headerShown: false }}
    />
    <DeckStack.Screen name="Deck" component={Deck} />
    <DeckStack.Screen name="Quiz" component={Quiz} />
    <DeckStack.Screen name="NewCard" component={NewCard} />
  </DeckStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Deck List"
      component={DeckStackScreen}
      options={{
        tabBarIcon: () => <FontAwesome name="sticky-note" size={20} />,
      }}
    />
    <AppTabs.Screen
      name="New Deck"
      component={NewDeck}
      options={{
        tabBarIcon: () => <FontAwesome name="plus-square" size={20} />,
      }}
    />
  </AppTabs.Navigator>
);

export default function App() {
  return (
    <Provider store={createStore(reducer, middleware)}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <AppTabsScreen />
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
