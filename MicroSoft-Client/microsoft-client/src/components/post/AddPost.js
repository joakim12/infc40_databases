import React, {Component} from 'react';
import styled from 'styled-components';
import apiPost from '../../api/PostApi';

const PostContainer = styled.div`
    width: 100vw;
    margin-top: 100px;
    border-top: 1px solid #333333;
    text-align: center;
    user-select: none;
    
    @media screen and (max-width: 500px) {
        width: 300px;
    }
`;

const Title = styled.h2`
    color: #444444;
    font-size: 24px;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 16px;
    }
`;

const FormContainer = styled.form`
    display: flex;
    margin: auto;
    flex-direction: column;
    width: 500px;
    margin-top: 40px;
    margin-bottom: 40px;
`;

const Input = styled.input`
    outline: none;
    padding: 7px;
    border: none;
    font-size: 14px;
    border: 1px solid #000000;
    margin-bottom: 10px;
`;

const TextArea = styled.textarea`
    outline: none;
    padding: 7px;
    height: 100px;
    border-bottom: 1px solid #000000;
    font-size: 14px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    height: 30px;
    width: 70px;
    margin-left: auto;
    margin-right: 0;
    color: #ffffff;
    background: #333333;
    border-radius: 2px;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
    &:hover {
        background: #444444;
    }    
`;

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.submitPostHandler = this.submitPostHandler.bind(this);

        this.state = {
            postTitle: "",
            postContent: ""
        };
    }

    changeTitleHandler = (event) => {
        event.preventDefault();
        this.setState({postTitle: event.target.value});
    };

    changeContentHandler = (event) => {
        event.preventDefault();
        this.setState({postContent: event.target.value});
    };

    submitPostHandler = (event) => {
        event.preventDefault();

        const post = {
            postId: 0,
            postTitle: this.state.postTitle,
            postContent: this.state.postContent,
            postPublisher: this.props.postPublisher
        };

        this.addPost(post)
    };

    addPost = (post) => {
        apiPost.addPost(post).then(response => {
            console.log(response);
            this.props.addToPosts(post);
            this.setState({postTitle: '', postContent: ''});
        }).catch((e) => {
            this.props.addPostFailed(e);
        });
    };

    render() {
        console.log(this.props.postPublisher);

        return (
            <PostContainer>
                <Title>Write new post</Title>
                <FormContainer>
                    <Input type="text" name="postTitle" placeholder="Title" onChange={this.changeTitleHandler}/>
                    <TextArea type="text" name="postContent" placeholder="Content"
                              onChange={this.changeContentHandler}/>
                    <Button onClick={(event) => this.submitPostHandler(event)}>Submit</Button>
                </FormContainer>
            </PostContainer>
        );
    }
}

export default AddPost;