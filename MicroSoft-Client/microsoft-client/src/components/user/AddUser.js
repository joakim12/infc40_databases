import React, {Component} from 'react';
import styled from 'styled-components';
import apiUser from '../../api/UserApi';

const UserContainer = styled.div`
    position: fixed;
    z-index: 1000;
    right: 5px;
    bottom: 5px;
    width: 100%;
    height: 100%;
    margin: auto;
    background: #ffffff;
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

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-top: 200px;
    margin-bottom: 20px;
    
    @media screen and (max-width: 700px) {
        font-size: 16px;
    }          
`;

const FormContainer = styled.form`
    margin-left: auto;
    margin-right: auto;
    width: 600px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    outline: none;
    padding: 7px;
    border: none;
    margin: auto;
    width: 400px;
    font-size: 14px;
    border-bottom: 1px solid #000000;
    margin-bottom: 10px;
`;

const Button = styled.button`
    height: 30px;
    width: 100px;
    margin: auto;
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

const CloseSymbol = styled.div`
    position: fixed;
    left: 30px;
    top: 30px;
    color: #333333;
    font-size: 52px;
    font-weight: bold;
    cursor: pointer;
`;

const ErrorMessage = styled.h2`
    height: 50px;
    width: 800px;
    margin: auto;
    color: #CC0033;
    font-size: 16px;
    text-align: center;
    user-select: none;
    
    @media screen and (max-width: 500px) {
        font-size: 12px;
    }    
`;

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.submitUserHandler = this.submitUserHandler.bind(this);

        this.state = {
            username: '',
            password: '',
            editUser: false,
            error: null
        };
    }

    changeUsernameHandler = (event) => {
        event.preventDefault();
        this.setState({username: event.target.value});
    };

    changePasswordHandler = (event) => {
        event.preventDefault();
        this.setState({password: event.target.value});
    };

    submitUserHandler = (event) => {
        event.preventDefault();

        const user = {
            username: this.state.username,
            pw: this.state.password
        };
        this.addUser(user)
    };

    toggleAdd = () => {
        this.setState((prevState) => {
            return {editUser: !prevState.editUser}
        });
    };

    addUser = (user) => {
        const {username} = this.state;
        const {password} = this.state;

        if (username !== '' && password !== '') {
            apiUser.addUser(user).then(response => {
                console.log(response);
                this.props.toggleMessage("You are now registered. Happy posting!");
                this.toggleAdd();
            }).catch((e) => {
                this.props.registerFailed("Oops, username/email already exists!");
            });
        }
        else if (username === '')
            this.setState({error: 'Please enter a valid username/email!'});
        else if (password === '')
            this.setState({error: 'Please enter a proper password!'});

    };

    render() {
        const {editUser} = this.state;
        const {error} = this.state;

        if (editUser) {
            return (
                <UserContainer show={editUser}>
                    <CloseSymbol onClick={this.toggleAdd}>&times;</CloseSymbol>
                    <Title>Register</Title>
                    <FormContainer>
                        <Input type="text" name="username" placeholder="Username/Email"
                               onChange={this.changeUsernameHandler}/>
                        <Input type="password" name="password" placeholder="Password"
                               onChange={this.changePasswordHandler}/>
                        <Button onClick={(event) => this.submitUserHandler(event)}>Register</Button>
                    </FormContainer>
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                </UserContainer>
            );
        }

        return (
            <Button onClick={this.toggleAdd}>Register</Button>
        )
    }
}

export default AddUser;