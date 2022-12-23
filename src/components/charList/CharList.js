import { useState, useEffect, useRef } from 'react';
// Главное не забудьте отписываться от таймаута и ставить зависимости в useEffect чтобы не попасть в бесконечный цикл и не исчерпать лемиты на запросы API
// и не забывайте про порядок работы функциональных компонентов, что зачем запускается это поможет справится с ошибками если они будут
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// CharInfo. rendomChar   Д.З
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true); /* 3 при загрузке первых 9 персонажей true когда только заходим на страницу*/
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();
    // useEffect запускается уже после рендеринга уже после того как onRequest стрелочная функция сущевствует внутри нашей функции
    useEffect(() => {
        onRequest(offset, true); /* вызывается этот метод без какого либо аргумента */
    }, []); /* пустой массив значит componentDidMount - функция выполнится только один раз при создании вашего компонента */

    //если я передем в onRequest(вторым аргументом); initial - если я передам true этому аргументу то я скажу коду что это первичная загрузка, это значит что это свойство newItemLoading(оно так и должно стоять false) нам не нужно его активировать
    // но если идет повторная загрузка у нас initial = false То я состояние буду устанавливать в setNewItemLoading(true)
    const onRequest = (offset, initial) => {/* ! */ /* offset = null */
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        // onCharListLoading(); /* 3 при первой загрузке state переключится в true  и это нормально*/
        getAllCharacters(offset) /* передаем какой-то отступ */
            .then(onCharListLoaded) /* !!получает новый массив с новыми персонажами */
            // .catch(onError)
    }

    // const onCharListLoading = () => {/* ! */ /* загружается */
    //     setNewItemLoading(true);
    // } тепреь это бесполезный метод 3

    const onCharListLoaded = (newCharList) => { /* ! */ /* !!получает новый массив с новыми персонажами */

        let ended = false;
        if (newCharList.length < 9) { /* если меньше 9 то скорее пустой массив и закончились дааные */
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]); /* callback функция для того чтобы соблюдать последовательность нашего state */ /* charList = санчала пустой потом 9 персонажей потом 18 и далеее */
        // setLoading(loading => false); 3
        setNewItemLoading(newItemLoading => false); /* соблюдаем последователность State */
        setOffset(offset => offset + 9); /* вот здесь мы отталкиваемся от предыдущего состояния */ /* когда персонажи загрузили то переключим в false */
        setCharEnded(charEnded => ended);
    }

    // const onError = () => { 3
    //     setLoading(loading => loading = false)
    //     setError(true)
    // }

    const itemRefs = useRef([]); /* current -ссылка на дом элемент */

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    const renderItems = (arr) => {

        const elements = arr.map((item, index) => {
            const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            const styleFit = item.thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};
        
            return(
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li 
                        className='char__item'
                        tabIndex={0}
                        ref={element => itemRefs.current[index] = element} /* старый способ, я просто элементы по порядку складываю в массив */
                        // key={item.id}
                        onClick={() => {
                            props.onCharSelected(item.id)
                            focusOnItem(index)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id)
                                focusOnItem(index)
                            }
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={styleFit}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {elements}
                </TransitionGroup>         
            </ul>

        )
    }

    
    // эта строчка уже не нужна так как наши переменные уже есть внутри функции
    // const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

    const elements = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    // У менять есть загрузка но при этом это не загрузка новых персонажей (сложно) и теперь спинер будет грузится один раз
    // const content = !(loading || error) ? elements : null; 3 убираю чтобы не было переРендеринга в функциональном компоннете это же не класс  (Null сначала )
    /* условие не обязательное можно и на прямую поместить блок (как мы и сделаем) */
    // const content = errorMessage || spinner || <View char={char} />
   
    return ( 
        <div className="char__list">
                {errorMessage}
                {spinner}
                {elements}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}/* ! */ /* либо true. false */
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
