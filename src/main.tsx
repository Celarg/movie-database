import React from 'react'
import ReactDOM from 'react-dom/client'
import Providers from "../lib/providers.tsx";
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Providers/>
    </React.StrictMode>,
)
