import React from "react";
import { connect } from "react-redux";
import { Text, Card, Button } from "react-native-elements";
class Deck extends React.Component {
  render() {
    const { navigation, deck } = this.props;
    const { title, questions } = deck;

    return (
      <Card>
        <Text>{title}</Text>
        <Text>{questions.length} card(s)</Text>
        <Button
          onPress={() => navigation.push("NewCard", { deckId: title })}
          title="Add Card"
        />
        <Button
          onPress={() => navigation.push("Quiz", { deckId: title })}
          title="Start Quiz"
        />
      </Card>
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
