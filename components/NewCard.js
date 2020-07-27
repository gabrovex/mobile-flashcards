import React from "react";
import { addCardToDeck } from "../utils/api";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { View, TouchableOpacity, TextInput, Text } from "react-native";

class NewCard extends React.Component {
  state = {
    question: "",
    answer: "",
  };

  handleQuestionChangeText = (question) => {
    this.setState(() => ({
      question,
    }));
  };

  handleAnswerChangeText = (answer) => {
    this.setState(() => ({
      answer,
    }));
  };

  handleSubmit = () => {
    const { question, answer } = this.state;

    if (!question || !answer) {
      return alert("Please, write a question and an answer.");
    }

    const card = {
      question,
      answer,
    };
    const { route, navigation } = this.props;
    const title = route.params.deckId;
    addCardToDeck(card, title).then(() => {
      const { dispatch } = this.props;
      this.props.dispatch(addCard(card, title));
    });

    this.setState(() => ({
      question: "",
      answer: "",
    }));
    navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View>
        <Text>Add a question and an answer for a new card</Text>
        <TextInput
          placeholder="Write a question"
          value={question}
          onChangeText={this.handleQuestionChangeText}
        />
        <TextInput
          placeholder="Write an answer"
          value={answer}
          onChangeText={this.handleAnswerChangeText}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(NewCard);
