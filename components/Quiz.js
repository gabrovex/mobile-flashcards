import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

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

  render() {
    const { questions } = this.props.deck;
    const totalCards = questions.length;
    const { cardIdx, correctAnswers, answerShown } = this.state;

    if (!totalCards) {
      return (
        <View>
          <Text>No cards for this deck!</Text>
        </View>
      );
    }

    const card = questions[cardIdx];

    if (!card) {
      const correctPercentage = Math.trunc((correctAnswers * 100) / totalCards);
      return (
        <View>
          <Text>You got the {correctPercentage}% of correct answers</Text>
        </View>
      );
    }

    const answer = answerShown ? (
      <Text>{card.answer}</Text>
    ) : (
      <TouchableOpacity onPress={this.showAnswer}>
        <Text>Show Answer</Text>
      </TouchableOpacity>
    );

    return (
      <View>
        <Text>
          Card: {cardIdx + 1}/{totalCards}
        </Text>
        <Text>{card.question}</Text>
        {answer}
        <TouchableOpacity onPress={this.submitAnswer.bind(this, true)}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.submitAnswer.bind(this, false)}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, { route }) {
  return {
    deck: decks[route.params.deckId],
  };
}

export default connect(mapStateToProps)(Quiz);
