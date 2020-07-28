import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import {Text} from 'react-native-elements';
class Deck extends React.Component {
  render() {
    const { navigation, deck } = this.props;
    const { title, questions } = deck;

    return (
      <View>
        <Text>{title}</Text>
        <Text>{questions.length} card(s)</Text>
        <TouchableOpacity
          onPress={() => navigation.push("NewCard", { deckId: title })}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Quiz", { deckId: title })}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, { route, navigation }) {
  return {
    deck: decks[route.params.deckId],
    navigation,
  };
}
export default connect(mapStateToProps)(Deck);
