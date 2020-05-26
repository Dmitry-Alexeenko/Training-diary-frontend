import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TrainingDiaryApp} from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TrainingDiaryApp/>, document.getElementById('root'));

serviceWorker.unregister();
