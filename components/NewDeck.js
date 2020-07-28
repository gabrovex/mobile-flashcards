import React from "react";
import { saveDeckTitle } from "../utils/api";
import { addDeck } from "../actions";
import { connect } from "react-redux";
import {Text, Card, Button, Input} from 'react-native-elements';

class NewDeck extends React.Component {
  state = {
    title: "",
  };

  handleSubmit = () => {
    const { title } = this.state;
    if (!title) {
      return alert("Please, write a title.");
    }

    saveDeckTitle(title);
    
    const { dispatch, navigation } = this.props;
    
    dispatch(addDeck(title));

    this.setState(() => ({
      title: "",
    }));
    
    navigation.navigate("Deck", { deckId: title });
  };

  handleChangeText = (text) => {
    this.setState(() => ({
      title: text,
    }));
  };

  render() {
    const { title } = this.state;
    return (
      <Card>
        <Text>What is the title of your new deck?</Text>
        <Input
          onChangeText={this.handleChangeText}
          placeholder="Write a title"
          value={title}
        />
        <Button onPress={this.handleSubmit} title="Submit" />
      </Card>
    );
  }
}

export default connect()(NewDeck);
