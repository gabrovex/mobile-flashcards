import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { fetchDecks } from "../utils/api";
import { getDecks } from "../actions";
import { Text, Card, ListItem } from "react-native-elements";
import { setLocalNotification } from "../utils/notifications";

class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks().then((decks) => dispatch(getDecks(decks)));
    setLocalNotification();
  }

  render() {
    const { decks, navigation } = this.props;
    return (
      <Card>
        {Object.entries(decks).map(([deckId, deck]) => {
          const { title, questions } = deck;
          return (
            <TouchableOpacity
              key={deckId}
              onPress={() => navigation.push("Deck", { deckId })}
            >
              <ListItem
                key={deckId}
                title={title}
                subtitle={`${questions.length} card(s)`}
                bottomDivider
              ></ListItem>
            </TouchableOpacity>
          );
        })}
      </Card>
    );
  }
}

function mapStateToProps(decks, { navigation }) {
  return {
    decks,
    navigation,
  };
}
export default connect(mapStateToProps)(DeckList);
