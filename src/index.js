import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IndexPage from './components/IndexPage/IndexPage.tsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<IndexPage />, document.getElementById('root'));
registerServiceWorker();
