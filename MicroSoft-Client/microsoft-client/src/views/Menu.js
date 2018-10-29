import React, {Component} from 'react';
import styled from "styled-components";
import Posts from "./Posts";
import Login from "./Login";

const Container = styled.div`
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: column;
    transform: ${props => props.newFrame ? 'slideOut' : null} 0.3s ease-in-out;
    animation: ${props => props.newFrame ? 'slideIn' : 'slideOut'} 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
   
    @keyframes slideOut {
        0% {
            transform: translateX(-20vw);
        }
    }
   
    @keyframes slideIn {
        100% {
             opacity: 0;
             transform: translateX(100vw);
        }  
    }  
`;

class Menu extends Component {
    state = {
        isLoggedIn: false,
        username: ''
    };

    toggleLogin = (username) => {
        this.setUsername(username);

        this.setState((prevState) => {
            return {isLoggedIn: !prevState.isLoggedIn}
        });
    };

    setUsername = (uname) => {
        this.setState({username: uname})
    };

    render() {
        const {isLoggedIn} = this.state;
        const {username} = this.state;

        if (!isLoggedIn) {
            return (
                <Container>
                    <Login toggleLogin={this.toggleLogin} setUsername={this.setUsername}/>
                </Container>
            );
        }

        return (
            <Container>
                <Posts postPublisher={username}/>
            </Container>
        );
    };
}

export default Menu;