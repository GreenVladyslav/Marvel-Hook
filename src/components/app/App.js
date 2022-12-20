import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import { MainPage, ComicsPage, Page404, SingleComicPage} from "../pages";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
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


// Как это все работает:
// Link - это обычная ссылка tag = a c атрибутом href  просто он работает как компонент
// Из компонентов стоит внимания: a)navLink - делает тоже самое что и сам Link (можно стелизовать)
// b)Redirect - может перенаправлять страницу по определенному адресу (можно использовать внутри условий) {login ? <Redirect to="/admin"/> : <LoginForm/>}
// остальные атрибуты не так часто используются



// v6
// Switch меняем на Routes
// компонент помещаем в elements
// exact теперь не нужен другой алгоритм сравнения <Route path="/" element={<MainPage/>}/>
// Изменение ссылок активности style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})}