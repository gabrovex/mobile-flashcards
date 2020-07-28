import React from "react";
import { addCardToDeck } from "../utils/api";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { Text, Card, Button, Input } from "react-native-elements";

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
    const { route, navigation, dispatch } = this.props;

    const title = route.params.deckId;

    addCardToDeck(card, title);

    dispatch(addCard(card, title));

    this.setState(() => ({
      question: "",
      answer: "",
    }));
    navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;

    return (
      <Card>
        <Text>Add a question and an answer for a new card</Text>
        <Input
          placeholder="Write a question"
          value={question}
          onChangeText={this.handleQuestionChangeText}
        />
        <Input
          placeholder="Write an answer"
          value={answer}
          onChangeText={this.handleAnswerChangeText}
        />
        <Button onPress={this.handleSubmit} title="Submit" />
      </Card>
    );
  }
}

export default connect()(NewCard);
