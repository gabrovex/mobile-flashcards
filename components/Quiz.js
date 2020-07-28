import React from "react";
import { connect } from "react-redux";
import { Text, Card, Button } from "react-native-elements";

class Quiz extends React.Component {
  state = {
    cardIdx: 0,
    correctAnswers: 0,
    answerShown: false,
  };

  showAnswer = () =>
    this.setState(() => ({
      answerShown: true,
    }));

  submitAnswer = (isCorrect) => {
    if (!this.state.answerShown) {
      return;
    }

    this.setState((state) => ({
      cardIdx: state.cardIdx + 1,
      correctAnswers: isCorrect
        ? state.correctAnswers + 1
        : state.correctAnswers,
      answerShown: false,
    }));
  };

  restartQuiz = () => {
    this.setState(() => ({
      cardIdx: 0,
      correctAnswers: 0,
    }));
  };

  backToDeck = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { questions } = this.props.deck;
    const totalCards = questions.length;
    const { cardIdx, correctAnswers, answerShown } = this.state;

    if (!totalCards) {
      return (
        <Card>
          <Text>No cards for this deck!</Text>
        </Card>
      );
    }

    const card = questions[cardIdx];

    if (!card) {
      const correctPercentage = Math.trunc((correctAnswers * 100) / totalCards);
      return (
        <Card>
          <Text>You got the {correctPercentage}% of correct answers</Text>
          <Button onPress={this.restartQuiz} title="Restart Quiz" />
          <Button onPress={this.backToDeck} title="Back to Deck" />
        </Card>
      );
    }

    const answer = answerShown ? (
      <Text>{card.answer}</Text>
    ) : (
      <Button onPress={this.showAnswer} title="Show Answer" />
    );

    return (
      <Card>
        <Text style={{ fontSize: 13 }}>
          Card: {cardIdx + 1}/{totalCards}
        </Text>
        <Text>{card.question}</Text>
        {answer}
        <Button
          onPress={this.submitAnswer.bind(this, true)}
          title="Correct"
          buttonStyle={{ backgroundColor: "green" }}
        />
        <Button
          onPress={this.submitAnswer.bind(this, false)}
          title="Incorrect"
          buttonStyle={{ backgroundColor: "red" }}
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

export default connect(mapStateToProps)(Quiz);
