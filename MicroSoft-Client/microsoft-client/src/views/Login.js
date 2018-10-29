import React, {Component} from 'react';
import styled from 'styled-components';
import LoginError from "../components/ui/LoginMessage";
import apiUser from '../api/UserApi';
import AddUser from "../components/user/AddUser";
import Message from "../components/ui/Message";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    height: 100%;
    margin: auto;
    margin-top: 20vh;
    text-align: center;
    @media screen and (max-width: 700px) {
        flex-direction: column;
        width: 90vw;
    }        
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    @media screen and (max-width: 700px) {
        font-size: 16px;
    }          
`;

const LoginDescription = styled.label``;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

const Input = styled.input`
    outline: none;
    padding: 7px;
    border: none;
    font-size: 14px;
    border-bottom: 1px solid #000000;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
`;

const LoginButton = styled.button`
    height: 30px;
    width: 100px;
    margin-left: 10px;
    margin-bottom: 10px;
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

class Login extends Component {
    state = {
        username: '',
        pw: '',
        error: false,
        errorMessage: '',
        register: false,
        message: '',
        toggleMessage: false
    };

    changeUsernameHandler = (event) => {
        event.preventDefault();
        this.setState({username: event.target.value});
    };

    changePasswordHandler = (event) => {
        event.preventDefault();
        this.setState({pw: event.target.value});
    };

    toggleRegister = () => {
        this.setState((prevState) => {
            return {register: !prevState.register}
        });
    };

    toggleLoginError = () => {
        this.setState((prevState) => {
            return {error: !prevState.error}
        });
    };

    toggleMessage = (msg) => {
        this.setState((prevState) => {
            return {toggleMessage: !prevState.toggleMessage, message: msg}
        });
    };

    registerFailedHandler = (message) => {
        this.setState({errorMessage: message});

        this.setState((prevState) => {
            return {error: !prevState.error}
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {username} = this.state;
        const {pw} = this.state;

        const user = {
            username: username,
            pw: pw
        };

        if (username !== '' && pw !== '') {
            apiUser.getUser(user).then(response => {
                this.props.toggleLogin(username);
            }).catch((e) => {
                console.log('Failed to login: ', e);
                this.setState({errorMessage: "Oops, invalid username and/or password!"});
                this.toggleLoginError();
            })
        }
        if (username === '' && pw === '') {
            this.setState({errorMessage: 'Please fill out a valid username and/or password!'});
            this.toggleLoginError();
        }
        if (username === '' && pw !== '') {
            this.setState({errorMessage: 'Please fill out a valid username/email!'});
            this.toggleLoginError();
        }
        if (pw === '' && username !== '') {
            this.setState({errorMessage: 'Oops, looks like you forgot to fill out a password!'});
            this.toggleLoginError();
        }
    };

    render() {

        return (
            <Container>
                <Title>Welcome</Title>
                <LoginDescription>Login with your <b>username/email</b></LoginDescription>
                <FormContainer autocomplete="off">
                    <Input type="text" name="username" placeholder="Username/Email"
                           onChange={this.changeUsernameHandler}/>
                    <Input type="password" name="pw" placeholder="Password" onChange={this.changePasswordHandler}/>
                </FormContainer>
                <ButtonContainer>
                    <AddUser registerFailed={this.registerFailedHandler} toggleMessage={this.toggleMessage}
                             toggleRegister={this.toggleRegister}/>
                    <LoginButton onClick={(event) => this.handleSubmit(event)}>Login</LoginButton>
                </ButtonContainer>
                <Message showMessage={this.state.toggleMessage} message={this.state.message}
                         closeMessage={this.toggleMessage}/>
                <LoginError showError={this.state.error} message={this.state.errorMessage}
                            closeLoginError={this.toggleLoginError}/>
            </Container>
        );
    }
}

export default Login;