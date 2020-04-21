import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './commentSection.css';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../../Configuration/fb';
import * as firebase from 'firebase';
     


class CommentSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            comments: [],
            newComment: "", 
            userName: this.props.userName,
            avatarUrl: "https://avatars.dicebear.com/v2/human/"+ this.props.userName +".svg"
        };    
    }
    componentDidMount(){
        this.onListenForComments();
            this.scrollChat();    
    }

    componentDidUpdate(){
            this.scrollChat();
    }

    addComment = e => {
        e.preventDefault();

        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("comments").add({
            user: this.state.userName,
            comment: this.state.newComment,
            created: firebase.firestore.Timestamp.now()
        });
        this.setState({
            newComment: ""
        });
        

    }
    
    onListenForComments = () => {
        
        db.collection("comments").orderBy("created", "asc").onSnapshot(snapshot => {
                let comments = [];
                this.state.comments.forEach(comment => {
                    comments.push(comment);
                })
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    if (change.type === 'added') {
                        comments.push(change.doc.data());
                    }
                })
                this.setState({
                    comments: comments
                });
        });

    };

    handleTextFieldChanges = name  => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    scrollChat(){
        this.el.scrollIntoView();
    }
   

    render() {
        return (
           <div id="comments-container">
                <List style={{ 
                    height: "475px", 
                    width: "95%",
                    margin: "auto",
                    marginBottom: "5px",
                    top: "3px",
                    overflowY: "auto"}}>

                    {this.state.comments.map((entry, index) => {
                        const avatarUrl = "https://avatars.dicebear.com/v2/human/" + entry.user + ".svg"

                        return (
                            <div id="message">
                                <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src={avatarUrl} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={entry.user}
                                    secondary={
                                        <React.Fragment>    
                                        {entry.comment}
                                    </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" style={{
                                    width: "210px"
                                }} />
                            </div>
                        )
                    })}
                    <div ref={el => { this.el = el; }}/>
                </List>
                <div id="create-comment-container">
                    <form noValidate autoComplete="off">
                    
                        <TextField id="filled-basic" 
                        label="Enter message"
                        value={this.state.newComment}
                        variant="outlined"
                        onChange={this.handleTextFieldChanges('newComment')}
                        style={{
                            width: "95%",
                            marginBottom: "3px"
                        }}/>
                    </form>
                    <Button onClick={this.addComment} variant="contained" style={{ 
                        width: "95%"
                     }}>
                        Send
                    </Button>
                    
                </div>
                
            </div>
        
        )
    }
}

export default CommentSection;