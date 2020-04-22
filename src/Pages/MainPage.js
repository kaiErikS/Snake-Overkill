import React, { Component } from 'react';
import SnakeGame from '../Components/SnakeGame/SnakeGame.component';
import Paper from '@material-ui/core/Paper';
import Results from '../Components/Results/Results.component';
import CommentSection from '../Components/CommentSection/CommentSection.component';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './MainPage.css';


class MainPage extends Component {

    constructor(){
        super();
        this.state = {
            userName: "",
            userSet: false
        }
        this.setUsername = this.setUsername.bind(this);
    }

    handleTextFieldChanges = name  => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    setUsername(){
        if (this.state.userName === "") {
            alert("Invalid username!")
        } else {
            this.setState({
                userSet: true
            });
        };
    };

    render() {

        if (!this.state.userSet) {
            return (
                <div>
                    <img id="title-img" alt="logo" src={require('../assets/logo_upscaled.png')} />
                    <Paper style={{
                        height: "165px",
                        width: "200px",
                        margin: "auto"
                    }}>
                        <h2>Set username</h2>
                        <TextField id="standard-basic" 
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleTextFieldChanges('userName')}
                            style={{
                                width: "95%",
                                padding: "5px",
                                left: "5px"
                            }}/>
                            <Button color="#00FF7F" onClick={this.setUsername} variant="contained" style={{ 
                                width: "95%",
                                backgroundColor: "#3CB371"
                            }}>
                            Set
                        </Button>
                    </Paper>
                </div>
            )
        }
       
        return (
            <div>
              <img id="title-img" alt="logo" src={require('../assets/logo_upscaled.png')} />
                <Grid 
                container spacing={3}
                direction="row"
                alignItems="center"
                justify="center">
                    <Grid item>
                        <CommentSection userName={this.state.userName}/>
                    </Grid>
                    <Grid item>
                        <SnakeGame userName={this.state.userName}/>
                    </Grid> 
                    <Grid item>
                        <Results />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MainPage;