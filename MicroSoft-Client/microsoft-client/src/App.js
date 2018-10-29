import React, {Component} from 'react';
import {createGlobalStyle} from "styled-components"
import Menu from "./views/Menu";

const GlobalStyle = createGlobalStyle`
  body {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        font-family: "Open Sans";
        font-size: 14px;
  }
`;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu/>
                <GlobalStyle/>
            </div>
        );
    }
}

export default App;
