import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

class Deck extends React.Component {
  render() {
    return (
      <View>
        <Text>Deck</Text>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(Deck);
