import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";

class Deck extends React.Component {
  render() {
    const { navigation, deck } = this.props;
    const { title, questions } = deck;

    return (
      <View>
        <Text>{title}</Text>
        <Text>{questions.length} card(s)</Text>
        <TouchableOpacity
          onPress={() => navigation.push("DeckList", { title })}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            questions.length && navigation.push("DeckList", { title })
          }
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
