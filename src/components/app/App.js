import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import AppBanner from "../appBanner/AppBanner"

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import ComicsList from "../comicsList/ComicsList";

import decoration from '../../resources/img/vision.png';


const App = () => {

    const [selectedChar, setChar] = useState(null)


    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                    <Route exact path="/">
                            <ErrorBoundary>
                                <RandomChar/>
                            </ErrorBoundary>
                            <div className="char__content">
                                <ErrorBoundary>
                                    <CharList onCharSelected={onCharSelected}/>
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <CharInfo charId={selectedChar}/>
                                </ErrorBoundary>
                            </div>
                            <img className="bg-decoration" src={decoration} alt="vision"/>
                        </Route>
                        <Route exact path="/comics">
                            <AppBanner/>
                            <ComicsList/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;

// Router - ключевой компоннет который будет оборачивать все ссылки и страинцы(маршруты) по которым будет переходить пользователь
// Router - помещаем все Router - для того чтобы у нас были рабочими все ссылки и все страницы на котороые будут ссылатся внутри компонента 
// если все в теге, потом компонент опять тег то нужно обязательно все обернуть
// 1)historyApi - позволяет путшествовать с помощью кнопочеку вперед и назад по приложение
// 2)Route - маршрут будет грузить если в url адресе появится определенная ссылка

// <Route path="/"> - какие url адреса будет отслеживать пишем в <Route path="comics">   / - Обычно основная
// Switch  - необходим чтобы загрузил нам подходящий компонент, а не сразу все
// Композиция - подргузка пользователя или товара 

// или использовать атрибут exact