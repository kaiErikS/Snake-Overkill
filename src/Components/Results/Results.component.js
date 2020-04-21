import './results.css';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { db } from '../../Configuration/fb';

class Results extends Component {

    constructor(){
        super();
        this.state = {
            scores: []
        };    
    }

    componentDidMount(){
        this.getResults();
    };

    getResults(){
        db.collection("scores").orderBy("score", "desc").limit(10).onSnapshot(snapshot => {
            let scores = [];
            this.state.scores.forEach(score => {
                scores.push(score);
            })
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    scores.push(change.doc.data());
                }
            })
            scores.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
            this.setState({
                scores: scores.reverse()
            });
    });
    }

    render() {
        return (
            <div id="results-container">
                <Paper>
                    <List>
                        {this.state.scores.map((entry, index) => {
                            return (
                                <ListItem>
                                    <ListItemIcon>
                                        <StarIcon  style={{ color: "#FBDA00" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={index + 1 + ". " + entry.user} secondary={entry.score + " points"}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
                
            </div>
        );
    }
}

export default Results;