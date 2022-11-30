import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
// import MarvelService from './services/MarvelService';

import './style/style.scss';

// const marvelService = new MarvelService(); /* потомок нашего класса (не забудь класс черзе new вызывается) */

// marvelService.getAllCharacters().then(res => console.log(res));
// marvelService.getSingleCharacter(1011052).then(res => console.log(res)); /* получаю одного персонажа по id */
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name))); /* получаю всех по имени или id что угодно */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>  </React.StrictMode>,
    <App/>
);

