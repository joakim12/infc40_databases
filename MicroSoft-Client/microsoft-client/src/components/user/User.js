import React from 'react';
import styled from "styled-components";

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

const UserContainer = styled.div`
    width: 60vw;
    display: flex;
    text-align: left;
    font-size: 24px;
    margin-bottom: 5px;
    border-bottom: 1px solid #bdbebf;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    
    @media screen and (max-width: 700px) {
        width: 80vw;
        font-size: 16px;
    }
`;

const Button = styled.button`
    color: #CC0033;
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

const User = (props) => (
    <Container key={props.id}>
        <UserContainer>
            {props.username}
            {props.pw}
        </UserContainer>
        <Button onClick={props.updateUser}>Update</Button>
        <Button onClick={props.deleteUser}>Delete</Button>
    </Container>
);

export default User;