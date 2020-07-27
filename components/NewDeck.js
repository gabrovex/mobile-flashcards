import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { saveDeckTitle } from "../utils/api";
import { addDeck } from "../actions";
import { connect } from "react-redux";

class NewDeck extends React.Component {
  state = {
    title: "",
  };

  handleSubmit = () => {
    const { title } = this.state;
    if (!title) {
      return alert("Please, write a title.");
    }
    saveDeckTitle(title).then((result) => {
      const { dispatch } = this.props;
      this.props.dispatch(addDeck(title));
    });
  };

  handleChangeText = (text) => {
    this.setState(() => ({
      title: text,
    }));
  };

  render() {
    const { title } = this.state;
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={this.handleChangeText}
          placeholder="Write a title"
          value={title}
        ></TextInput>
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(NewDeck);
