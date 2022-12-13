import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true); /* при загрузке первых 9 персонажей true */
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();
    // useEffect запускается уже после рендеринга уже после того как onRequest стрелочная функция сущевствует внутри нашей функции
    useEffect(() => {
        onRequest(); /* вызывается этот метод без какого либо аргумента */
    }, []); /* пустой массив значит componentDidMount - функция выполнится только один раз при создании вашего компонента */

    const onRequest = (offset) => {/* ! */ /* offset = null */
        onCharListLoading(); /* при первой загрузке state переключится в true  и это нормально*/
        marvelService.getAllCharacters(offset) /* передаем какой-то отступ */
            .then(onCharListLoaded) /* !!получает новый массив с новыми персонажами */
            .catch(onError)
    }

    const onCharListLoading = () => {/* ! */ /* загружается */
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => { /* ! */ /* !!получает новый массив с новыми персонажами */
        let ended = false;
        if (newCharList.length < 9) { /* если меньше 9 то скорее пустой массив и закончились дааные */
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]); /* callback функция для того чтобы соблюдать последовательность нашего state */ /* charList = санчала пустой потом 9 персонажей потом 18 и далеее */
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false); /* соблюдаем последователность State */
        setOffset(offset => offset + 9); /* вот здесь мы отталкиваемся от предыдущего состояния */ /* когда персонажи загрузили то переключим в false */
        setCharEnded(charEnded => ended);
    }

    const onError = () => {
        setLoading(loading => loading = false)
        setError(true)
    }

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
                <li 
                    className='char__item'
                    tabIndex={0}
                    ref={element => itemRefs.current[index] = element} /* старый способ, я просто элементы по порядку складываю в массив */
                    key={item.id}
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
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    // Этот метод создан для оптимизации, МОЙ МЕТОД для каждоый карточки
//     renderItems(charList) {
        
//         const elements = charList.map(item => {
//             const {id, ...itemProps} = item;
//             return (
//                 <Character key={id}
//                     {...itemProps}/>
//             )
//         })
// // А эта конструкция вынесена для центровки спиннера/ошибки
//         return(
//             <ul className="char__grid">
//                 {elements}
//             </ul>
//         )
//     }

    
    // эта строчка уже не нужна так как наши переменные уже есть внутри функции
    // const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

    const elements = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? elements : null;
    // const content = errorMessage || spinner || <View char={char} />

    return (
        <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
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

// const Character = (charList) => {

//     const {name, thumbnail} = charList;

//     const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
//     const styleFit = thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};

//     return (
//         <li className='char__item'>
//             <img src={thumbnail} alt={name} style={styleFit}/>
//             <div className="char__name">{name}</div>
//         </li>
//     )
// }