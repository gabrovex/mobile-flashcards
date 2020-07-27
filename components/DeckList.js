import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { fetchDecks } from "../utils/api";
import { getDecks } from "../actions";

class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks().then((decks) => dispatch(getDecks(decks)));
  }

  render() {
    const { decks } = this.props;
    return (
      <View>
        {Object.entries(decks).map(([deckId, deck]) => {
          const { title, questions } = deck;
          return (
            <TouchableOpacity key={deckId}>
              <Text>{title}</Text>
              <Text>{questions.length} card(s)</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(DeckList);
