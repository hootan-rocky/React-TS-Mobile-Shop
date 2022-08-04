import React from 'react';
import App from "./App";
import './styles/main.scss'
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import index from "./store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={index}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
