import React from 'react';
import styled from "styled-components";
import EditPost from "./EditPost";

const Container = styled.div`
    width: 80vw;
    padding: 24px;
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        flex-direction: column;
    }
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    border-bottom: 1px solid #bdbebf;
`;

const PostTitle = styled.div`
    width: 600px;
    margin: auto;
    display: flex;
    text-align: left;
    font-size: 24px;
    margin-bottom: 5px;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        font-size: 16px;
    }
`;

const PostContent = styled.div`
    width: 600px;
    margin: auto;
    display: flex;
    text-align: left;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 5px;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        font-size: 16px;
    }
`;

const PostPublisher = styled.div`
    width: 600px;
    margin: auto;
    display: flex;
    font-size: 14px;
    font-style: italic;
    margin-top: 20px;
    margin-bottom: 5px;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        font-size: 16px;
    }
`;

const ButtonContainer = styled.div`
    margin-bottom: 0;
    margin: auto;
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

const Post = (props) => (
    <Container key={props.id}>
        <PostContainer>
            <PostTitle>
                {props.postTitle}
            </PostTitle>
            <PostContent>
                {props.postContent}
            </PostContent>
            <PostPublisher>
                Published by: {props.postPublisher}
            </PostPublisher>
        </PostContainer>
        <ButtonContainer>
            <EditPost toggleMessage={props.toggleMessage} editPost={props.editPost} postId={props.id} postTitle={props.postTitle}
                      postContent={props.postContent} postPublisher={props.postPublisher}/>
            <Button onClick={() => props.deletePost(props.id)}>Delete</Button>
        </ButtonContainer>
    </Container>
);

export default Post;