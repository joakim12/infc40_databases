import React, {Component} from 'react';
import styled from 'styled-components';
import Post from '../components/post/Post';
import apiPost from '../api/PostApi';
import AddPost from "../components/post/AddPost";
import Message from "../components/ui/Message";

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    animation: 'slideIn' 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
   
    @keyframes slideIn {
        0% {
            transform: translateX(-20vw);
        }
    }
`;

const ImageContainer = styled.img`
    height: 50px;
    width: 50px;
    margin-right: 20px;  
`;

const Title = styled.h1`
    color: #444444;
    font-size: 50px;
    user-select: none;
    cursor: default;
    
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`;

const Subtitle = styled.h2`
    height: 16px;
    width: 800px;
    color: #333333;
    font-size: 16px;
    text-align: center;
    user-select: none;
    
    @media screen and (max-width: 500px) {
        font-size: 12px;
    }    
`;

const Subtitle2 = styled.h2`
    height: 50px;
    width: 800px;
    color: #333333;
    font-size: 16px;
    text-align: center;
    user-select: none;
    border-bottom: 1px solid #333333;
    
    @media screen and (max-width: 500px) {
        font-size: 12px;
    }    
`;

const Content = styled.header`
    margin-top: 64px;    
    display: flex;
    flex-direction: column;
    overflow: auto;    
    
    @media screen and (max-width: 500px) {
        width: 320px;
    }
`;

class Posts extends Component {
    state = {
        posts: [],
        editPost: false,
        message: '',
        toggleMessage: false
    };

    componentDidMount() {
        apiPost.getPosts().then(response => {
            const data = response.map(post => {
                return {
                    ...post
                }
            });
            data.sort((a, b) => b.postId - a.postId).slice();
            this.setState({posts: data});
        })
    };

    toggleMessage = () => {
        this.setState((prevState) => {
            return {toggleMessage: !prevState.toggleMessage}
        });
    };

    addToPosts = (post) => {
        const posts = [...this.state.posts];
        posts[this.state.posts.length] = post;
        this.setState({posts, message: 'Post added!'});
        this.toggleMessage();
    };

    editPost = (post) => {
        const updated = this.state.posts.map(p => {
            if (p.postId === post.postId) {
                return {...p, ...post}
            }
            return p
        });

        this.setState({posts: updated, message: 'Post updated!'});
        this.toggleMessage();
    };

    removePost = (id) => {
        apiPost.deletePost(id);
        const posts = [...this.state.posts];
        const updated = posts.filter(p => {
            return p.postId !== id;
        });
        this.setState({posts: updated, message: "Message deleted"});
        this.toggleMessage();
    };

    render() {
        const {posts} = this.state;
        const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-dC9SJCP1UwICJ1RH1Vhdf8qXXA__srX0H7LFkifEQwxmNu7';

        return (
            <Container>
                <Title> <ImageContainer src={url}/>MicroSoft</Title>
                <Subtitle>Welcome back, {this.props.postPublisher}!</Subtitle>
                <Subtitle2>Read some posts, post some posts, edit some posts, or delete some posts...</Subtitle2>
                <Content>
                    {posts.map(p => {
                        return <Post key={p.postId} id={p.postId} postTitle={p.postTitle} postContent={p.postContent}
                                     postPublisher={p.postPublisher}
                                     editPost={this.editPost}
                                     deletePost={this.removePost}/>
                    })}
                </Content>
                <AddPost addToPosts={this.addToPosts} postPublisher={this.props.postPublisher}
                         addPostFailed={this.addPostFailed}/>
                <Message showMessage={this.state.toggleMessage} message={this.state.message}
                         closeMessage={this.toggleMessage}/>
            </Container>
        );
    };
}

export default Posts;