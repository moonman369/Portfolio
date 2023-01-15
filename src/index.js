import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM  from "react-dom";
import App from './App';
import './index.css';

ReactDOM.render(
    <CookiesProvider>
        <App/>
    </CookiesProvider>,
    document.querySelector("#root")
)