import React, { Component } from 'react';
import './gameStyle.css';
import Snake from '../Snake/Snake.component';
import Food from '../Food/Food.component';
import { db } from '../../Configuration/fb';
import * as firebase from 'firebase';

const getCoords = () => {
    const min = 1;
    const max = 98; 
    const x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    const y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    console.log(x, y)

    return [x,y]
};

const initState = {
    playVisibility: "",
    score: 0,
    refreshrate: 150,
    sessionHighest: 0,
    direction: 'RIGHT',
    foodPos: getCoords(),
    snakeParts: [
        [0,0],
        [2,0]
    ]
};



class SnakeGame extends Component {

    constructor(props){
        super(props);
        this.state = initState
    };
    

    componentDidMount(){
        setInterval(this.turnSnake, this.state.refreshrate);
        document.onkeydown = this.onKeyDown;
    }

componentDidUpdate(){
    this.checkOutOfBounds();
    this.checkIfCrashed();
    this.checkFoodEaten();
}

    onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                this.setState({direction: "UP"})
                break;
            case 40:
                this.setState({direction: "DOWN"})
                break;
            case 37:
                this.setState({direction: "LEFT"})
                break;
            
            case 39:
                this.setState({direction: "RIGHT"})
                break;
        }
    }

    turnSnake = () => {
        let parts = [...this.state.snakeParts];
        let head = parts[parts.length - 1];

        switch (this.state.direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;

            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;

            case 'DOWN':
                head = [head[0], head[1] + 2];
            break;

            case 'UP':
                head = [head[0], head[1] - 2];
            break;
        }
        parts.push(head);
        parts.shift();
        this.setState({
            snakeParts: parts
        });
    }

    checkOutOfBounds(){
        let snakeHead = this.state.snakeParts[this.state.snakeParts.length - 1];
        if (snakeHead[0] >= 100 || snakeHead[1] >= 100 || snakeHead[0] < 0 || snakeHead[1] < 0) {
            this.gameOver();
            console.log(snakeHead);
        }
    }

    checkIfCrashed(){
        let snake = [...this.state.snakeParts];
        let snakeHead = snake[snake.length - 1];
        snake.pop();
        snake.forEach(part => {
            if (snakeHead[0] === part[0] && snakeHead[1] === part[1] ) {
                this.gameOver();
            }
        })
    }

    checkFoodEaten(){
        let snakeHead = this.state.snakeParts[this.state.snakeParts.length - 1];
        let food = this.state.foodPos;

        if (snakeHead[0] === food[0] && snakeHead[1] === food[1]) {
            this.setState({
                foodPos: getCoords()
            });
            this.onFoodEaten();
            this.increaseSnakeSpeed();
        }
    }

    onFoodEaten(){
        let newSnake = [...this.state.snakeParts];

        newSnake.unshift([]);
        this.setState({
            snakeParts: newSnake,
            score: this.state.score + 1
        });
    }

    increaseSnakeSpeed(){
        if (this.state.refreshrate > 10) {
            this.setState({
                refreshrate: this.state.refreshrate - 10
            });
        }
    }

    gameOver(){
        if (this.state.score > this.state.sessionHighest && this.state.score > 0) {
            const scoreToSave = this.state.score
            this.saveScore(scoreToSave);
            
            this.setState({
                score: initState.score,
                refreshrate: initState.refreshrate,
                sessionHighest: scoreToSave,
                direction: initState.direction,
                foodPos: initState.foodPos,
                snakeParts: initState.snakeParts
            });
        } else {
            this.setState({
                score: initState.score,
                refreshrate: initState.refreshrate,
                direction: initState.direction,
                foodPos: initState.foodPos,
                snakeParts: initState.snakeParts
            });
        }
    };

    saveScore(score){   
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("scores").add({
            user: this.props.userName,
            score: score,
            created: firebase.firestore.Timestamp.now()
        });
    };

   

    render() {
        return (
            <div className="game-container">
                <div className="game_window">
                    <div id="score">
                        <h3>Score {this.state.score}</h3>
                    </div>
                    <Snake snakeParts={this.state.snakeParts} />
                    <Food part={this.state.foodPos}/>
                </div>
            </div>
        );
    }
}

export default SnakeGame;