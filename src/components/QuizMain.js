import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';

export default class Quiz extends Component {

    // initiating the local state
    state = {
        quiestions: {
            1: '1.In which one of the following page replacement policies, Belady’s anomaly may occur?',
            2: '2.In a binary tree with n nodes, every node has an odd number of descendants. Every node is considered to be its own descendant. What is the number of nodes in the tree that have exactly one child?',
            3: '3.How many 32K × 1 RAM chips are needed to provide a memory capacity of 256 K-bytes = ?',
            4: '4.A software requirements specification (SRS) document should avoid discussing which one of the following?'
        },
        answers: {
            1: {
                1: 'FIFO',
                2: 'Optimal',
                3: 'Lrue',
                4: 'MRU'
            },
            2: {
                1: '0',
                2: '1',
                3: '(n-1)/2',
                4: 'n-1'
            },
            3: {
                1: '8',
                2: '32',
                3: '64',
                4: '128'
            },
            4: {
                1: 'User interface issues',
                2: 'Non-functional requirements',
                3: 'Design specification',
                4: 'Interfaces with third party software'
            }
        },
        correctAnswers: {
            1: '1',
            2: '4',
            3: '3',
            4: '4'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        return(
            <div className="Content">
                {step <= Object.keys(quiestions).length ? 
                    (<>
                        <Question
                            question={quiestions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(quiestions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(quiestions).length}</p>
                            <p>Thank you!</p>
                        </div>
                    )
                }
            </div>
        );
    }
}