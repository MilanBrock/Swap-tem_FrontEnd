import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap-grid.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);

reportWebVitals();

