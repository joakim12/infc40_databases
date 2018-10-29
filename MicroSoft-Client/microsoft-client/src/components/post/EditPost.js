import React, {Component} from 'react';
import styled from 'styled-components';
import apiPost from '../../api/PostApi';

const PostContainer = styled.div`
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    bottom: 300px;
    width: 50vw;
    height: 350px;
    margin: auto;
    background: #ffffff;
    border: 1px solid #000000;
    box-shadow: 5px 10px #333333;
    animation: ${props => (props.show ? 'slideOut' : 'slideIn')} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
      
    @media screen and (max-width: 700px) {
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 90vw;
    }
    
    @keyframes slideOut {
      0% {
         transform: translateX(100vw);
      }
   }
   
    @keyframes slideIn {
      100% {
         transform: translateX(100vw);
      }
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`;

const TextArea = styled.textarea`
    outline: none;
    padding: 7px;
    height: 150px;
    width: 400px;
    font-size: 14px;
    margin: auto;
    margin-bottom: 10px;
`;

const Title = styled.h2`
    color: #444444;
    font-size: 24px;
    text-align: center;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 16px;
    }
`;

const Button = styled.button`
    color: #333333;
    background: #ffffff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        font-size: 12px;
        width: 100px;
    }
`;

const CloseSymbol = styled.div`
    margin-left: 10px;
    color: #333333;
    font-size: 36px;
    font-weight: bold;
`;

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.submitPostHandler = this.submitPostHandler.bind(this);

        this.state = {
            postContent: this.props.postContent,
            editPost: false
        };
    }

    changeContentHandler = (event) => {
        event.preventDefault();
        this.setState({postContent: event.target.value});
    };

    submitPostHandler = (event) => {
        event.preventDefault();

        const post = {
            postId: this.props.postId,
            postTitle: this.props.postTitle,
            postContent: this.state.postContent,
            postPublisher: this.props.postPublisher
        };
        this.editPost(post)
    };

    toggleEdit = () => {
        this.setState((prevState) => {
            return {editPost: !prevState.editPost}
        });
    };

    editPost = (post) => {
        try {
            apiPost.editPost(post).then(response => {
                console.log(response);

                this.props.editPost(post);
            });
        } catch (e) {
            console.log('Failed to edit post: ', e);
        }

        this.toggleEdit();
    };

    render() {
        const {editPost} = this.state;

        if (editPost) {
            return (
                <PostContainer show={editPost}>
                    <CloseSymbol onClick={this.toggleEdit}>&times;</CloseSymbol>
                    <FormContainer>
                        <Title>Edit post</Title>
                        <TextArea type="text" name="postContent" value={this.state.postContent}
                                  onChange={this.changeContentHandler}/>
                        <Button onClick={(event) => this.submitPostHandler(event)}>Submit</Button>
                    </FormContainer>
                </PostContainer>
            );
        }

        return (
            <Button onClick={this.toggleEdit}>Edit</Button>
        )
    }
}

export default EditPost;